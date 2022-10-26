import React from 'react';
import Container from "@mui/material/Container";

import MainHome from '../components/MainHome';
import LeftHome from '../components/LeftHome';
import RightHome from '../components/RightHome';
import LeftHomeBottom from '../components/LeftHomeBottom';
import RightHomeBottom from '../components/RightHomeBottom';

const Home = () => {
  return (
    <Container fixed>
      <MainHome />
      <LeftHome />
      <LeftHomeBottom />
      <RightHome />
      <RightHomeBottom />
    </Container>
  )
}

export default Home