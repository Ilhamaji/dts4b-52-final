import { Box, Grid, CircularProgress } from "@mui/material";
import React from "react";
import { news } from "../features/NewsSlice";
// import MainHome from "../components/MainHome";
import LeftHome from "../components/LeftHome";
import RightHome from "../components/RightHome";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import MainHome from "../components/MainHome";

const Home = () => {
  return (
    <Container fixed>
      {/* <Box sx={{ margin: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <LeftHome />
          </Grid>
          <Grid item xs={6}>
            <MainHome />
          </Grid>
          <Grid item xs={3}>
            <RightHome />
          </Grid>
        </Grid>
      </Box> */}
      <MainHome />
    </Container>
  );
};

export default Home;
