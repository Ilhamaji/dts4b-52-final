import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getDetailAsync,
  selectPesanDetail,
  selectDetail,
} from "../features/NewsSlice";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user] = useAuthState(auth);
  const detailData = useSelector(selectDetail);
  const pesanDetail = useSelector(selectPesanDetail);

  useEffect(() => {
    console.log("terpanggil");

    if (!user && state.sectionId == "sport") {
      navigate("/login", { replace: true });
    }

    if (!detailData.status) {
      dispatch(getDetailAsync(state.apiUrl));
    }
  }, []);

  return (
    <Container fixed sx={{ textAlign: "left" }}>
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
            border: "5px solid #000",
            my: 5,
            px: 5,
            pb: 5,
          }}
        >
          {pesanDetail === "loading"
            ? "Loading.."
            : pesanDetail === "rejected"
            ? "Terputus!"
            : ""}
          {pesanDetail === "idle" ? (
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
  );
};

export default Detail;
