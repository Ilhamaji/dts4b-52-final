import {
  Typography,
  List,
  ListItemText,
  ListItem,
  Divider,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getNewsRightAsync,
  selectRightNews,
  getNewsRightBAsync,
  selectRightBNews,
} from "../features/NewsSlice";

import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

const RightHome = () => {
  const dispatch = useDispatch();
  const newsData = useSelector(selectRightNews);
  const newsDataB = useSelector(selectRightBNews);

  useEffect(() => {
    if (!newsData.response) {
      dispatch(getNewsRightAsync());
    }
    if (!newsDataB.response) {
      dispatch(getNewsRightBAsync());
    }
  }, []);

  return (
    <>
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
          Politics
        </Typography>
      </Container>
      {!newsData.response ? (
        <CircularProgress sx={{ color: "#000" }} />
      ) : (
        newsData.response.results.map((article) => (
          <List
            key={article.id}
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              display: "inline-flex",
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={article.webTitle}
                secondary={article.fields.trailText}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        ))
      )}

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
          Business
        </Typography>
      </Container>
      {!newsDataB.response ? (
        <CircularProgress sx={{ color: "#000" }} />
      ) : (
        newsDataB.response.results.map((article) => (
          <List
            key={article.id}
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              display: "inline-flex",
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={article.webTitle}
                secondary={article.fields.trailText}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        ))
      )}
    </>
  );
};

export default RightHome;
