import { Typography, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getNewsMainAsync, selectMainNews } from '../features/NewsSlice';

const MainHome = () => {
  const dispatch = useDispatch();
  const newsData = useSelector(selectMainNews);
  
  useEffect(() => {
    if(!newsData.response){
      dispatch(getNewsMainAsync());
    }
  }, []);

  return (
    <>
    <h1>TODAY</h1>
    {!newsData.response ? 'Loading..' : newsData.response.results.map((article) => (
      <Card key={article.id} sx={{ width: '100%', mb:1}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={article.fields.thumbnail}
            alt={article.webTitle}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {article.webTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {article.fields.trailText}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      ))}
    </>
  )
}

export default MainHome