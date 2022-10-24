import * as React from "react";
import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import { ExitToApp, AccountCircle } from "@mui/icons-material";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
//import { getNewsAsync } from '../features/NewsSlice';

const pages = [
  "General",
  "Business",
  "Entertainment",
  "Health",
  "Science",
  "Sports",
  "Technology",
];

function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (x) => {
    //dispatch(getNewsAsync('&categories=' + x.toLowerCase()))
  };

  const [open, setOpen] = useState(false);
  const handleList = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <Container fixed>
        <Box sx={{ flexGrow: 1, marginTop: 2 }}>
          <AppBar
            sx={{
              width: "100%",
              backgroundColor: "transparent",
              boxShadow: 0,
            }}
            position="static"
          >
            <Toolbar>
              <Box
                sx={{
                  xs: "none",
                  sm: "block",
                }}
              >
                <Typography
                  noWrap
                  component="div"
                  sx={{
                    fontSize: "16px",
                    backgroundColor: "#000",
                    color: "irenhite",
                    width: "WrapText",
                    padding: 1,
                    borderRadius: 1.5,
                    display: "inline-flex",
                    fontFamily: "Playfair Display",
                  }}
                >
                  News
                </Typography>
                <Typography
                  noWrap
                  component="div"
                  sx={{
                    marginLeft: 1,
                    fontSize: "16px",
                    color: "#000",
                    display: "inline-flex",
                    fontFamily: "Playfair Display",
                  }}
                >
                  Portal
                </Typography>
              </Box>
              <IconButton sx={{ mr: 0, ml: "auto", color: "#000" }}>
                {user ? (
                  <IconButton size="large" color="inherit">
                    <ExitToApp onClick={onLogout} />
                  </IconButton>
                ) : (
                  <IconButton size="large" color="inherit">
                    <AccountCircle
                      onClick={() => navigate("/login", { replace: true })}
                    />
                  </IconButton>
                )}
              </IconButton>
              <IconButton
                onClick={handleList}
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ ml: 1, color: "#000" }}
              >
                {open ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Toolbar>
            <List
              sx={{
                zIndex: "2",
                with: "match-parent",
                position: "relative",
                bgcolor: "#000",
                py: "0",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {pages.map((page) => (
                    <ListItemButton onClick={() => handleClick(page)}>
                      <ListItemText primary={page} onClick={handleList} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </List>
          </AppBar>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Navbar;
