import { Box, Grid, CircularProgress } from '@mui/material';
import React from 'react';
import { news } from '../features/NewsSlice';
import MainHome from '../components/MainHome';
import LeftHome from '../components/LeftHome';
import RightHome from '../components/RightHome';
import { useDispatch, useSelector } from 'react-redux';

import Container from "@mui/material/Container";

const Home = () => {
  return (
    <Container fixed>
      <MainHome />
      <LeftHome />
      <RightHome />
    </Container>
  )
}

export default Home