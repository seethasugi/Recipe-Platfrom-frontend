import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Recipe Sharing Platform
        </Typography>
        <Button color="inherit" component={Link} to="/admin/recipesList">
          AdminDashboard
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/profile">
          Profile
        </Button>
        <Button color="inherit" component={Link} to="/" onClick={() => window.history.replaceState(null, null, "/")}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
