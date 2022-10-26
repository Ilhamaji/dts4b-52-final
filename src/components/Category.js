import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { useSelector, useDispatch } from "react-redux";
//import { useEffect } from "react";
import {
  selectCategory,
  sortCategory,
} from "../features/NewsSlice";

import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

const Category = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const [queryParams, setQueryParams] = useSearchParams();
  const categoryData = useSelector(selectCategory);
  const [sortValue, setSortValue] = useState("");

  const handlePremium = (x) => {
    if (!user && x.sectionId === "sport") {
      alert("Please register or login!");
    } else {
      navigate("/detail", {
        state: { articleId: x.id, section: x.sectionId, apiUrl: x.apiUrl },
        replace: true,
      });
    }
  };

  const setSortParam = (type) => {
    setSortValue(type);
    queryParams.set("sort", type);
    setQueryParams(queryParams);
    dispatch(sortCategory(queryParams.get("sort")));
  };

  return (
    <Box sx={{ mt: 5, mb: 5 }}>
      <Container fixed>
        <Container fixed>
          <center>
            <Typography
              variant="h6"
              sx={{
                mb: 5,
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: "#000",
                color: "#fff",
                width: "fit-content",
                blockSize: "fit-content",
              }}
            >
              {queryParams.get("section") ? queryParams.get("section") : ""}{" "} Page
            </Typography>
          </center>

          <ToggleButtonGroup
            size="small"
            color="primary"
            value={sortValue}
            exclusive
            aria-label="Platform"
            sx={{ mb: 5 }}
          >
            <ToggleButton value="asc" onClick={() => setSortParam("asc")}>
              Asc
            </ToggleButton>
            <ToggleButton value="desc" onClick={() => setSortParam("desc")}>
              Desc
            </ToggleButton>
          </ToggleButtonGroup>
        </Container>
      </Container>

      {categoryData.response ? (
        categoryData.response.results.map((cdata, index) => (
          <Card
            key={"cardkey-" + index}
            sx={{
              mx: 1,
              display: "inline-flex",
              maxWidth: 345,
              bgcolor: "#000",
              color: "#fff",
              mb: 1,
            }}
          >
            <CardActionArea
              onClick={() => {
                handlePremium(cdata);
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={cdata.fields.thumbnail}
                alt={cdata.webTitle}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {cdata.webTitle}
                </Typography>
                <Typography variant="body2" color="#deddd9">
                  {cdata.fields.trailText}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      ) : (
        <CircularProgress sx={{ color: "#000" }} />
      )}
    </Box>
  );
};

export default Category;
