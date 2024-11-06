import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
//import { Box, Container, Typography, Button } from "@mui/material";
import {
  Container,
  Box,
  //TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const BackgroundLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const [profile, setProfile] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    console.log(user);
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log("ress", res);
          setProfile(res.data);
          handleLogin(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleLogin = (profileData) => {
    axios
      .post(`https://h3x2y9-5000.csb.app/api/auth/register`, {
        name: profileData.name,
        email: profileData.email,
        googleId: profileData.id,
        Picture: profileData.Picture,
        VerifiedEmail: true,
        loginType: "Google",
      })
      .then((res) => {
        console.log("ress", res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", profileData.name);
        localStorage.setItem("userId", res.data._id);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const handleUserLogin = (profileData) => {
    axios
      .post(`https://h3x2y9-5000.csb.app/api/auth/register`, {
        email: email,
        password: password,
        loginType: "User",
      })
      .then((res) => {
        console.log("ress", res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", profileData.name);
        localStorage.setItem("userId", res.data._id);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic form validation
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    axios
      .post(`https://h3x2y9-5000.csb.app/api/auth/register`, {
        email: email,
        password: password,
        loginType: "User",
      })
      .then((res) => {
        console.log("ress", res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", email);
        localStorage.setItem("userId", res.data._id);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(https://images.unsplash.com/photo-1504674900247-0877df9cc836)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          zIndex: 1,
          ":before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
            zIndex: 2,
          },
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            height: "100vh",
            zIndex: 3, // Place content above the overlay
            textAlign: "center",
            color: "#fff",
          }}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              height: "100%",
              background: `url(https://source.unsplash.com/random/1600x900) no-repeat center center fixed`,
              backgroundSize: "cover",
              backdropFilter: "blur(5px)",
            }}
          >
            <Paper
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                borderRadius: 2,
                color: "white",
                width: "100%",
                maxWidth: 400,
                boxShadow: 5,
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
                Login to RecipeShare
              </Typography>

              {error && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ mb: 2, color: "white" }}
                >
                  {error}
                </Typography>
              )}

              {/* Email and Password Form */}
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                  sx={{
                    mb: 2,
                    input: { color: "white" },
                    label: { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                    },
                  }}
                />

                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                  sx={{
                    mb: 2,
                    input: { color: "white" },
                    label: { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mb: 2,
                    backgroundColor: "#f50057",
                    "&:hover": {
                      backgroundColor: "#c51162",
                    },
                  }}
                >
                  Login
                </Button>
              </form>

              {/* Google Login */}
              {/* <GoogleLogin
                //onClick={() => login()}
                onSuccess={login()}
                onError={() => setError("Google login failed.")}
                useOneTap
                shape="circle"
                width="100%"
              /> */}
            </Paper>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default BackgroundLayout;
