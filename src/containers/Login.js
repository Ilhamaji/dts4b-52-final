import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

import { auth } from "../config/firebase";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      // kita pakai fungsi ini untuk login
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const forgotPassword = () => {
    // insert email to reset password here
    sendPasswordResetEmail(auth, "")
      .then(() => {
        console.log("email sent");
      })
      .catch((error) => {
        console.log(error.message);
      });
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
            Login
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
            Login
          </Button>
          <Link to="/register">{"Don't have an account? Sign Up"}</Link>
          <Button onClick={forgotPassword}>{"Forgot password"}</Button>
        </center>
      </Box>
    </React.Fragment>
  );
};

export default Login;
