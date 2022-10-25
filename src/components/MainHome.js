import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getNewsMainAsync,
  selectMainNews,
  getMainPremiumAsync,
  selectMainPremium,
} from "../features/NewsSlice";

import Container from "@mui/material/Container";
import LeftHome from "./LeftHome";
import RightHome from "./RightHome";
import CircularProgress from "@mui/material/CircularProgress";

const MainHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const newsData = useSelector(selectMainNews);
  const premiumData = useSelector(selectMainPremium);

  useEffect(() => {
    if (!newsData.response) {
      dispatch(getNewsMainAsync());
    }

    if (premiumData.length === 0) {
      dispatch(getMainPremiumAsync());
    }
  }, []);

  const handleDetail = (x) => {
    if (!user && x.sectionId === "sport") {
      alert("Please register or login!");
    } else {
      navigate("/detail", {
        state: { articleId: x.id, section: x.sectionId, apiUrl: x.apiUrl },
        replace: true,
      });
    }
  };

  const responsive = {
    flex: { xs: "100%", sm: "calc(50% - 20px)", md: "calc(33% - 20px)" },
    display: "inline-flex",
    maxWidth: 345,
    my: 2,
    mx: 1,
  };

  return (
    <React.Fragment>
      <Box sx={{ my: 2 }}>
        <Container sx={{ textAlign: "left" }} fixed>
          <Typography
            variant="h6"
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              bgcolor: "#000",
              color: "#fff",
              width: "fit-content",
              blockSize: "fit-content",
            }}
          >
            Sports New Premium
          </Typography>
        </Container>
        <Container sx={{ my: 2 }} fixed>
          {premiumData.results ? (
            <Card
              key={premiumData.results[0].id}
              sx={{
                justifyItems: "start",
                my: 4,
                mr: "auto",
                width: "100%",
                display: "flex",
                overflow: "hidden",
              }}
            >
              <CardActionArea
                sx={{ bgcolor: "#000", color: "#fff" }}
                onClick={() => {
                  handleDetail(premiumData.results[0]);
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={premiumData.results[0].fields.thumbnail}
                  alt={premiumData.results[0].webTitle}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {premiumData.results[0].webTitle}
                  </Typography>
                  <Typography variant="body2" color="#deddd9">
                    {premiumData.results[0].fields.trailText}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ) : (
            <CircularProgress sx={{ color: "#000" }} />
          )}
        </Container>
      </Box>

      <Box sx={{ my: 2 }}>
        <Container sx={{ textAlign: "left" }} fixed>
          <Typography
            variant="h6"
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              bgcolor: "#000",
              color: "#fff",
              width: "fit-content",
              blockSize: "fit-content",
            }}
          >
            Today
          </Typography>
        </Container>

        <Container sx={{ my: 2 }} fixed>
          {!newsData.response ? (
            <CircularProgress sx={{ color: "#000" }} />
          ) : (
            newsData.response.results.map((article) => (
              <Card key={article.id} sx={responsive}>
                <CardActionArea
                  onClick={() => {
                    handleDetail(article);
                  }}
                  sx={{ bgcolor: "#000", color: "#fff" }}
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
        </Container>
      </Box>

      <LeftHome />
      <RightHome />
    </React.Fragment>
  );
};

export default MainHome;
