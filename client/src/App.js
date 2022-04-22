import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts, getCities } from './actions/posts';
import FilterBank from "./components/FilterBank/FilterBank"
import Pagination from "./components/Pagination/Pagination"
import useStyles from './styles';
// import memories from './images/bank.png';

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const [currentPage, setCurrentPage] = useState(0)
  const [filters, setfilters] = useState({});
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts({}, 1, 10));
    dispatch(getCities());
  }, [currentId, dispatch]);

  const onFilter = (filters) => {
    setfilters(filters)
    setCurrentPage(0)
    dispatch(getPosts(filters));
  }

  const refreshPosts = (page, limit) => {
    setCurrentPage(page)
    dispatch(getPosts(filters, page + 1, limit));
  }

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Bank Clients</Typography>
        <img className={classes.image} src="/bank.png" alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <FilterBank onFilter={onFilter}></FilterBank>
              <Posts setCurrentId={setCurrentId} refreshPosts={refreshPosts} pageNo={currentPage} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
