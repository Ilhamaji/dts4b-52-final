import { Typography, List, ListItemText, ListItem, Divider } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getNewsLeftAsync, selectLeftNews } from '../features/NewsSlice';

const LeftHome = () => {
  const dispatch = useDispatch();
  const newsData = useSelector(selectLeftNews);
  
  useEffect(() => {
    if(!newsData.response){
      dispatch(getNewsLeftAsync());
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

export default LeftHome