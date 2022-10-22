import { Box, Backdrop, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { news } from '../features/NewsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { gantiKategoriAsync } from '../features/NewsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newsData = useSelector(news);
  
  useEffect(() => {
    if(!newsData.data){
      dispatch(gantiKategoriAsync(''));
    }
  }, []);

  return (
    <Box sx={{ margin: 10 }}>
      Welcome to Mood Meter! <br/>
      {!newsData.data ? <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop> : newsData.data.map((article) => (
                  <Typography key={article.id} textAlign="center" onClick={() => console.log("test")/* handleClick(article.id) */ }>{article.title}</Typography>
              ))}
    </Box>
  )
}

export default Home