import React, { useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from "../Pagination/Pagination"
import Post from './Post/Post';
import useStyles from './styles';
import { useState } from 'react';
import { getPosts } from '../../actions/posts';

const Posts = ({ setCurrentId, refreshPosts, pageNo }) => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(pageNo)
  const [limit, setLimit] = useState(10)
  const classes = useStyles();

  useEffect(() => {
    setCurrentPage(pageNo);
  }, [pageNo])

  const handlePagination = (page) => {
    setCurrentPage(page?.selected)
    refreshPosts(page?.selected, limit);
  }

  return (
    <>
      <Pagination
        currentPage={currentPage}
        limit={limit}
        totalRecords={posts?.count}
        handlePagination={handlePagination}
      />
      {!posts?.data?.length ? <CircularProgress /> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {posts?.data?.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={6}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Posts;
