import { Typography, List, ListItemText, ListItem, Divider } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getNewsRightAsync, selectRightNews } from '../features/NewsSlice';

const RightHome = () => {
  const dispatch = useDispatch();
  const newsData = useSelector(selectRightNews);
  
  useEffect(() => {
    if(!newsData.response){
      dispatch(getNewsRightAsync());
    }
  }, []);

  return (
    <>
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
    </>
  )
}

export default RightHome