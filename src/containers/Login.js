import {useState} from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { sendPasswordResetEmail, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

import { auth } from '../config/firebase';

const Login = () => {
  const authReset = getAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [emailReset, setEmailReset] = useState('');

  const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = data.get('email');
      const password = data.get('password');

      try {
          // kita pakai fungsi ini untuk login
          await signInWithEmailAndPassword(auth, email, password);
          navigate("/");
      } catch (error) {
          setErrorMessage(error.message);
      }
  };

  const [open, setOpen] = React.useState(false);
  const forgotPassword = () => {
    setOpen(true);
  }
  const handleSend = async() => {
    // insert email to reset password here
    if(emailReset!==''){
      sendPasswordResetEmail(authReset, emailReset)
      .then(() => {
        setOpen(false);
        alert('Reset email Sent!');
      })
      .catch((error) => {
        /* const errorCode = error.code;
        const errorMessage = error.message; */
        alert('Terjadi kesalahan');
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setEmailReset(event.target.value);
  };

  return (
    <React.Fragment>
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        flexGrow: 1,
        width: "350px",
        mx: "auto",
        my: "5vh",
        backgroundColor: "#fff",
        justifyContent: "center",
        border: "1px #000 solid",
        borderRadius: "20px",
        boxShadow: "10px 10px 10px #bbb",
      }}
    >
      {errorMessage ? (
        <Alert sx={{ borderRadius: "20px" }} severity="error">
          Invalid credential!
        </Alert>
      ) : (
        ""
      )}
      <center style={{ marginTop: "5vh", marginBottom: "8vh" }}>
        <Avatar sx={{ mb: "2vh", bgcolor: "#000" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h4" sx={{ mb: "2vh" }}>
          Sign In
        </Typography>
        <TextField
          sx={{ my: "1vh", backgroundColor: "#f5f5f5" }}
          required
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          sx={{ my: "1vh", backgroundColor: "#f5f5f5" }}
          required
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            my: "2vh",
            display: "block",
            px: "83px",
            backgroundColor: "#000",
            "&:hover": {
              backgroundColor: "#555",
            },
          }}
        >
          Sign In
        </Button>
        <Link to="/register">{"Don't have an account? Sign Up"}</Link>
        <Button onClick={forgotPassword}>{"Forgot password"}</Button>
      </center>
    </Box>

    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Reset Email</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To reset your password, please enter your email address here. We
          will send reset instruction to your email.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSend}>Send</Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
  );
}

export default Login;
