import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";
import Navbar from "./Navbar";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://h3x2y9-5000.csb.app/api/auth/profile/${localStorage.getItem(
          "userId"
        )}`
      )
      .then((response) => setProfile(response.data))
      .catch((error) => console.error("Error fetching profile", error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        `https://h3x2y9-5000.csb.app/api/auth/users/${localStorage.getItem(
          "userId"
        )}`,
        profile
      )
      .then((response) => {
        console.log("Profile updated");
        localStorage.setItem("userName", response.data.user.name);
      })
      .catch((error) => console.error("Error updating profile", error));
  };

  return (
    <>
      <Navbar />
      <Container style={{ paddingTop: 50 }}>
        <Typography variant="h4" gutterBottom>
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="Email"
            value={profile?.email || ""}
            // onChange={handleInputChange}
            fullWidth
            margin="normal"
            aria-readonly
          />
          <TextField
            label="Name"
            name="name"
            value={profile?.name || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
      </Container>
    </>
  );
};

export default ProfilePage;
