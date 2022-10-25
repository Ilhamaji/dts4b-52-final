import { Box } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetailAsync, selectPesanDetail, selectDetail } from '../features/NewsSlice';

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
    <Container sx={{ textAlign: "left" }} fixed>
      <Container fixed>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            pr: 3,
            bgcolor: "#000",
            "&:hover": { bgcolor: "#444" },
          }}
          onClick={() => navigate("/")}
        >
          <ArrowBackIcon />
          <b>Back to Home</b>
        </Button>
        <Box
          sx={{
            bgcolor: "#000", color:"#fff",
            border: "5px solid #000",
            mt: 5,
            mb: 5,
            px: 5,
            py: 2,
          }}
        >
          {console.log(detailData)}
          {pesanDetail === "loading"
            ? "Loading.."
            : pesanDetail === "rejected"
            ? "Terputus!"
            : ""}
          {pesanDetail === "idle" && detailData.content ? (
            <>
              <h1>{detailData.content.webTitle}</h1>
              <div
                id="terms-content"
                dangerouslySetInnerHTML={{
                  __html: detailData.content.fields.body,
                }}
              />
            </>
          ) : (
            ""
          )}
        </Box>
      </Container>
    </Container>
  )
}

export default Detail