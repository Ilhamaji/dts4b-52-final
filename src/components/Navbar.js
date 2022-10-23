import * as React from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Grid } from '@mui/material';
import { ExitToApp, AccountCircle } from '@mui/icons-material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useDispatch } from 'react-redux';
import { getNewsAsync } from '../features/NewsSlice';

const pages = ['General', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = async () => {
    try {
        await signOut(auth);
    } catch (err) {
        console.log(err);
    }
  };

  const handleClick = (x) => {
    /* navigate('/detail', { replace: true }); */
    dispatch(getNewsAsync('&categories=' + x.toLowerCase()))
  };
  
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{ backgroundColor: '#61758b' }}>
        <Toolbar>
          <Grid container>
            <Grid item xs={11} sx={{mt: 1}}>
              <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                      //flexGrow: 1,
                      display: 'inline',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      color: 'inherit',
                      textDecoration: 'none',
                  }}
              >
                DTS NEWS PORTAL
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                {pages.map((page) => (
                    <Typography key={page} textAlign="center" onClick={() => handleClick(page) }>{page}</Typography>
                ))}
              </Box>
              
            </Grid>
            <Grid item xs={1} align='right'>
              <IconButton
                  size="large"
                  color="inherit"
              >
                {user ? <ExitToApp /> : <AccountCircle />}
              </IconButton>

              {user ? (
                <div>
                    {user.email}
                    <IconButton
                        size="large"
                        onClick={onLogout}
                        color="inherit"
                    >
                        <ExitToApp />
                    </IconButton>
                </div>
              ) : ''}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;