import { Box, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetailAsync, selectPesanDetail, selectDetail } from '../features/NewsSlice';

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {state} = useLocation();
  const [user] = useAuthState(auth);
  const detailData = useSelector(selectDetail);
  const pesanDetail = useSelector(selectPesanDetail);
  
  useEffect(() => {
    console.log("terpanggil");
    
    if(!user && state.sectionId=='sport'){
      navigate('/login', { replace: true })
    }
    
    if(!detailData.status){
      dispatch(getDetailAsync(state.apiUrl));
    }
  }, []);

  return (
    <Box sx={{ mt: 10, mb: 5, ml:5, mr:5 }}>
      {pesanDetail==='loading' ? 'Loading..' : pesanDetail==='rejected' ? 'Terputus!' : ''}
      {pesanDetail==='idle' ?
        <>
          <h1>{detailData.content.webTitle}</h1>
          <div id="terms-content" dangerouslySetInnerHTML={{__html: detailData.content.fields.body}}/>
        </> : ''
      }
    </Box>
  )
}

export default Detail