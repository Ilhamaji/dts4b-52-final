import { Box } from '@mui/material';
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
    if(!user && state.sectionId=='sport'){
      alert("Please register or login!");
    }
    
    dispatch(getDetailAsync(state.apiUrl));
  }, [user, dispatch]);

  return (
    <Box sx={{ mt: 10, mb: 5, ml:5, mr:5 }}>
      {console.log(detailData)}
      {pesanDetail==='loading' ? 'Loading..' : pesanDetail==='rejected' ? 'Terputus!' : ''}
      {pesanDetail==='idle' && detailData.content ?
        <>
          <h1>{detailData.content.webTitle}</h1>
          <div id="terms-content" dangerouslySetInnerHTML={{__html: detailData.content.fields.body}}/>
        </> : ''
      }
    </Box>
  )
}

export default Detail