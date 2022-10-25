import { Typography, List, ListItemText, ListItem, Divider } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getNewsRightAsync, selectRightNews, getNewsRightBAsync, selectRightBNews } from '../features/NewsSlice';

const RightHome = () => {
  const dispatch = useDispatch();
  const newsData = useSelector(selectRightNews);
  const newsDataB = useSelector(selectRightBNews);
  
  useEffect(() => {
    if(!newsData.response){
      dispatch(getNewsRightAsync());
    }
    if(!newsDataB.response){
      dispatch(getNewsRightBAsync());
    }
  }, []);

  return (
    <>
    <h3>Politics</h3>
    {!newsData.response ? 'Loading..' : newsData.response.results.map((article) => (
      <List key={article.id} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={article.webTitle}
            secondary={article.fields.trailText}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      ))}

    <h3>Business</h3>
    {!newsDataB.response ? 'Loading..' : newsDataB.response.results.map((article) => (
      <List key={article.id} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={article.webTitle}
            secondary={article.fields.trailText}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      ))}
    </>
  )
}

export default RightHome