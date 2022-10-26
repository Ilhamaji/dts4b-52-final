import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getNewsLeftAsync,
  selectLeftNews,
} from "../features/NewsSlice";

import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

const LeftHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newsData = useSelector(selectLeftNews);

  useEffect(() => {
    dispatch(getNewsLeftAsync());
  }, [dispatch]);

  const handleDetail = (x) => {
    navigate("/detail", {
      state: { articleId: x.id, section: x.sectionId, apiUrl: x.apiUrl },
      replace: true,
    });
  };

  const responsive = {
    flex: { xs: "100%", sm: "calc(50% - 20px)", md: "calc(33% - 20px)" },
    display: "inline-flex",
    maxWidth: 345,
    my: 2,
    mx: 1,
  };

  return (
    <>
      <Container sx={{ textAlign: "left" }} fixed>
        <Typography
          variant="h6"
          sx={{
            px: 2,
            py: 1,
            borderRadius: 2,
            bgcolor: "#000242",
            color: "#fff",
            width: "fit-content",
            blockSize: "fit-content",
          }}
        >
          Movies
        </Typography>
      </Container>
      {!newsData.response ? (
        <CircularProgress sx={{ color: "#000242" }} />
      ) : (
        newsData.response.results.map((article) => (
          <Card key={article.id} sx={responsive}>
            <CardActionArea
              sx={{ bgcolor: "#000242", color: "#fff" }}
              onClick={() => { handleDetail(article); }}
            >
              <CardMedia
                component="img"
                height="200"
                image={article.fields.thumbnail}
                alt={article.webTitle}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {article.webTitle}
                </Typography>
                <Typography variant="body2" color="#deddd9">
                  {article.fields.trailText}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      )}
    </>
  );
};

export default LeftHome;
