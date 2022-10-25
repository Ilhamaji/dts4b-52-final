import React from 'react';
import MainHome from '../components/MainHome';
import LeftHome from '../components/LeftHome';
import RightHome from '../components/RightHome';

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