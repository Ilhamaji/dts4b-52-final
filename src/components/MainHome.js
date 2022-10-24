import { Typography, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getNewsMainAsync, selectMainNews, getMainPremiumAsync, selectMainPremium } from '../features/NewsSlice';

const MainHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const newsData = useSelector(selectMainNews);
  const premiumData = useSelector(selectMainPremium);
  
  useEffect(() => {
    if(!newsData.response){
      dispatch(getNewsMainAsync());
    }
    
    if(premiumData.length===0){
      dispatch(getMainPremiumAsync());
    }
  }, []);

  const handlePremium = (x) => {
    if(!user && x.sectionId==='sport'){
      alert("Please register or login!");
    }else{
      navigate('/detail', { state: { articleId: x.id, section: x.sectionId, apiUrl: x.apiUrl }, replace: true });
    }
  };

  return (
    <>
      <h1>Sports News Premium</h1>
      {premiumData.results ? 
      <Card key={premiumData.results[0].id} sx={{ width: '100%', mb:1}}>
        <CardActionArea onClick={() => {handlePremium(premiumData.results[0])}}>
          <CardMedia
            component="img"
            height="300"
            image={premiumData.results[0].fields.thumbnail}
            alt={premiumData.results[0].webTitle}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {premiumData.results[0].webTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {premiumData.results[0].fields.trailText}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card> : 'Loading..' }

      <h2>TODAY</h2>
      {!newsData.response ? 'Loading..' : newsData.response.results.map((article) => (
        <Card key={article.id} sx={{ width: '100%', mb:1}}>
          <CardActionArea onClick={() => {handlePremium(article)}}>
            <CardMedia
              component="img"
              height="200"
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