import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => {
    try {
        const filter = JSON.parse(req?.query?.filter || "{}");
        const page = parseInt(req?.query?.page) || 1
        const limit = parseInt(req?.query?.limit) || 10
        let query = { $and: [] }

        if (filter && Object.keys(filter)?.length > 0) {
            if (filter?.balance?.min && filter?.balance?.max) {
                query.$and.push({ balance: { $gte: parseFloat(filter?.balance?.min), $lt: parseFloat(filter?.balance?.max) } })
            }

            if (filter?.isMortgage) {
                query.$and.push({ haveMortgage: { $regex: filter?.isMortgage, $options: "i" } })
            }

            if (filter?.noOfCreditCards) {
                query.$and.push({ numCreditCards: { $gte: filter?.noOfCreditCards } })
            }

            if (filter?.city?.length > 0) {
                query.$and.push({ city: { $in: filter?.city } })
            }
        } else {
            delete query.$and
        }


        const postMessages = await PostMessage.paginate(query, { page, limit });

        res.status(200).json({ count: postMessages?.total || 0, data: postMessages?.docs || [] });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { balance, city, clientName, haveMortgage, numCreditCards, selectedFile } = req.body;

    const newPostMessage = new PostMessage({ clientName, city, balance, haveMortgage, numCreditCards, selectedFile })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { clientName, city, balance, haveMortgage, numCreditCards, selectedFile } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { clientName, city, balance, haveMortgage, numCreditCards, selectedFile, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
}

export const getCities = async (req, res) => {
    try {
        const cities = await PostMessage.find({}).distinct("city")
        res.json(cities);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;
