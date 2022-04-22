import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, FormControl, Select, MenuItem, InputLabel, OutlinedInput, useTheme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';

const FilterBank = ({ onFilter }) => {
    const theme = useTheme();

    const [filterData, setFilterData] = useState({ balance: { min: "", max: "" }, city: "", isMortgage: "", noOfCreditCards: "" });
    const [cityName, setCityName] = useState([])
    const cities = useSelector((state) => state.cities);
    const classes = useStyles();

    const clear = () => {
        setFilterData({ balance: { min: "", max: "" }, city: "", isMortgage: "", noOfCreditCards: "" });
        onFilter({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onFilter(filterData);
    };

    function getStyles(name, cityName, theme) {
        return {
            fontWeight:
                cityName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setCityName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setFilterData({ ...filterData, city: cityName })
    };

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Apply Filter</Typography>
                <TextField name="balance" type="number" variant="outlined" label="Minimum Balance" fullWidth value={filterData?.balance?.min} onChange={(e) => setFilterData({ ...filterData, balance: { ...filterData.balance, min: e.target.value } })} />
                <TextField name="balance" type="number" variant="outlined" label="Maximum Balance" fullWidth value={filterData?.balance?.max} onChange={(e) => setFilterData({ ...filterData, balance: { ...filterData.balance, max: e.target.value } })} />
                <FormControl fullWidth variant="outlined" className={classes.selectForm}>
                    <InputLabel id="demo-simple-select-label">Have Mortgage?</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterData?.isMortgage}
                        label="Have Mortgage?"
                        onChange={(e) => setFilterData({ ...filterData, isMortgage: e.target.value })}
                    >
                        <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>
                    </Select>
                </FormControl>
                <TextField name="numCreditCards" type="number" variant="outlined" label="#of Credit Cards" fullWidth value={filterData?.noOfCreditCards} onChange={(e) => setFilterData({ ...filterData, noOfCreditCards: e.target.value })} />
                <FormControl variant="outlined" fullWidth className={classes.selectForm}>
                    <InputLabel id="demo-multiple-name-label">City</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={cityName}
                        onChange={handleChange}
                        input={<OutlinedInput label="City" />}
                        MenuProps={MenuProps}
                    >
                        {cities?.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, cityName, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper >
    );
};

export default FilterBank;
