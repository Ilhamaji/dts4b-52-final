import { Box, ToggleButton, ToggleButtonGroup, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { selectPesanCategory, selectCategory, sortCategory } from '../features/NewsSlice';

const Category = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const [queryParams, setQueryParams] = useSearchParams();
  const categoryData = useSelector(selectCategory);
  const pesanCategory = useSelector(selectPesanCategory);
  const [sortValue, setSortValue] = useState('');
  
  useEffect(() => {
    if(!user && state.section.toLowerCase()==='sport'){
      alert("Please register or login!");
    }
  }, []);

  const handlePremium = (x) => {
    if(!user && x.sectionId==='sport'){
      alert("Please register or login!");
    }else{
      navigate('/detail', { state: { articleId: x.id, section: x.sectionId, apiUrl: x.apiUrl }, replace: true });
    }
  };

  const setSortParam = (type) => {
    setSortValue(type);
    if(state){
      queryParams.set("section", state.section);
    }
    queryParams.set("sort", type);
    setQueryParams(queryParams);
    dispatch(sortCategory(queryParams.get('sort')));
  }

  return (
    <Box sx={{ mt: 20, mb: 5, ml:5, mr:5 }}>
      <h1>{queryParams.get('section') ? queryParams.get('section') : (state.section ? state.section  : '')} Page</h1>
      <ToggleButtonGroup
        size="small"
        color="primary"
        value={sortValue}
        exclusive
        aria-label="Platform"
        sx={{ mb: 5 }}
      >
        <ToggleButton value="asc" onClick={() => setSortParam("asc")}>Asc</ToggleButton>
        <ToggleButton value="desc" onClick={() => setSortParam("desc")}>Desc</ToggleButton>
      </ToggleButtonGroup>
      <Masonry columns={4} spacing={2}>
        {categoryData.response ? categoryData.response.results.map((cdata, index) => (
          <Card key={'cardkey-' + index} sx={{ width: '100%', mb:1}}>
            <CardActionArea onClick={() => {handlePremium(cdata)}}>
              <CardMedia
                component="img"
                height="300"
                image={cdata.fields.thumbnail}
                alt={cdata.webTitle}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {cdata.webTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cdata.fields.trailText}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )) : ''}
      </Masonry>
    </Box>
  )
}

export default Category