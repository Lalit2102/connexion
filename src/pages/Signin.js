import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase-config.js";
import AppContext from "../Contexts/AppContexts.js";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

//TODO: Handle if already logged in, immediately redirect.

export default function Signin() {
  const AppContexts = useContext(AppContext);
  const { showAlert } = AppContexts;
  const {
    register,
    formState: { errors },
    reset,
    getValues,
    handleSubmit,
  } = useForm();
  const usersRef = collection(db, "users");

  const onSubmit = async (data) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      let name = "";
      const q = query(usersRef, where("email", "==", data.email));
      const q1 = await getDocs(q);
      q1.forEach((doc) => {
        name = doc.data().name;
      });
      showAlert(`Welcome Back ${name}!`, "success");
      reset({ email: "", password: "" });
    } catch (e) {
      console.log(e);
    }
  };

  const resetPassword = async () => {
    try {
      const { email } = getValues();
      await sendPasswordResetEmail(auth, email);
      showAlert(
        "Kindly Check your Inbox/Spam for Resetting your password.",
        "success"
      );
    } catch (error) {
      showAlert(error.code.substring(5), "error");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              error={errors.email ? true : false}
              helperText={errors.email?.message}
              label="Email Address"
              {...register("email", { required: "email cannot be blank" })}
              name="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              error={errors.password ? true : false}
              helperText={errors.password?.message}
              type="password"
              id="password"
              {...register("password", {
                required: "password cannot be blank",
              })}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <a
                  style={{ color: "#0a58ca", textDecoration: "underline" }}
                  onClick={resetPassword}>
                  Forgot password?
                </a>
              </Grid>
              <Grid item>
                <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
