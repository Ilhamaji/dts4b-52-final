import { Box } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getDetailAsync,
  selectPesanDetail,
  selectDetail,
} from "../features/NewsSlice";

import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

const Detail = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const detailData = useSelector(selectDetail);
  const pesanDetail = useSelector(selectPesanDetail);

  useEffect(() => {
    dispatch(getDetailAsync(state.apiUrl));
  }, [dispatch, state.apiUrl]);

  return (
    <Container sx={{ textAlign: "left" }} fixed>
      <Container fixed>
        <Box
          sx={{
            bgcolor: "#000",
            color: "#fff",
            border: "5px solid #000",
            mt: 5,
            mb: 5,
            px: 5,
            py: 2,
          }}
        >
          {console.log(detailData)}
          {pesanDetail === "loading" ? (
            <CircularProgress sx={{ color: "#fff" }} />
          ) : pesanDetail === "rejected" ? (
            "Terputus!"
          ) : (
            ""
          )}
          {pesanDetail === "idle" && detailData.content ? (
            <>
              <h1>{detailData.content.webTitle}</h1>
              <div
                id="terms-content"
                className="sesuaikansendiri"
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
