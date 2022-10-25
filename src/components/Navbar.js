import * as React from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Grid, Button } from '@mui/material';
import { ExitToApp, AccountCircle } from '@mui/icons-material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { auth } from '../config/firebase';

const pages = ['General', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

function Navbar() {
  const [user] = useAuthState(auth);
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
      navigate('/category', { state: { section: x }, replace: true });
    }
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
                  sx={{
                      //flexGrow: 1,
                      display: 'inline',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      color: 'inherit',
                      textDecoration: 'none',
                  }}
              >
                <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/">DTS NEWS PORTAL</Link>
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                {pages.map((page) => (
                    <Button
                      key={page}
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={() => handleClick(page)}>{page}</Button>
                ))}
              </Box>
              
            </Grid>
            <Grid item xs={1} align='right'>
              {user ? <IconButton
                  size="large"
                  color="inherit"
              >
                <ExitToApp onClick={onLogout} />
              </IconButton> : 
              <IconButton
                  size="large"
                  color="inherit"
              >
                <AccountCircle onClick={() => navigate('/login', { replace: true }) } />
              </IconButton>}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;