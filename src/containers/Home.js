import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { news } from '../features/NewsSlice';
import MainHome from '../components/MainHome';
import LeftHome from '../components/LeftHome';
import RightHome from '../components/RightHome';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getNewsAsync } from '../features/NewsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newsData = useSelector(news);
  
  useEffect(() => {
    if(!newsData.data){
      dispatch(getNewsAsync(''));
    }
  }, []);

  return (
    <Box sx={{ margin: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <LeftHome />
        </Grid>
        <Grid item xs={6}>
          <MainHome />
        </Grid>
        <Grid item xs={3}>
          <RightHome />
        </Grid>
      </Grid>
      
      {!newsData.data ? 'Loading...' : newsData.data.map((article) => (
            <Typography key={article.id} textAlign="center" onClick={() => console.log("test")/* handleClick(article.id) */ }>{article.title}</Typography>
        ))}
    </Box>
  )
}

export default Home