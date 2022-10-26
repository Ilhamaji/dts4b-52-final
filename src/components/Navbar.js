import * as React from 'react';
import {useState} from "react";
import { Box, AppBar, Toolbar, IconButton, Button } from '@mui/material';
import { ExitToApp, AccountCircle } from '@mui/icons-material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { getCategoryAsync } from '../features/NewsSlice';

import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const pages = ['Business', 'Books', 'Environment', 'Fashion', 'Sports', 'Technology'];

function Navbar() {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await signOut(auth);
      navigate('/', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (x) => {
    if(!user && x.toLowerCase()==='sports'){
      alert("Please register or login!");
    }else{
      setOpen(false);
      dispatch(getCategoryAsync(x.toLowerCase()));
      navigate({
        pathname: '/category',
        search: '?section='+x,
      }, {replace: true});
      /* navigate('/category', { state: { section: x }, replace: true }); */
    }
  };

  const handleHome = () => {
    navigate("/", {replace: true});
    setOpen(false);
  }

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
            <Button
              variant="contained"
              sx={{
                mt: 3,
                pr: 3,
                bgcolor: "#000",
                "&:hover": { bgcolor: "#444" },
              }}
              onClick={handleHome}
            >
              <b>News Portal</b>
            </Button>
            {user ? 
            <IconButton sx={{ mr: 0, ml: "auto", color: "#000" }} onClick={onLogout}>
              <ExitToApp />
            </IconButton> : 
            <IconButton sx={{ mr: 0, ml: "auto", color: "#000" }} onClick={() => navigate("/login", { replace: true })}>
                <AccountCircle/>
            </IconButton>
            }
            
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
                <ListItemButton onClick={handleHome}>
                  <ListItemText primary="Home" />
                </ListItemButton>
                {pages.map((page) => (
                  <ListItemButton key={'section_'+page} onClick={() => handleClick(page)}>
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