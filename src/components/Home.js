import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import Navbar from "./Navbar";

const Home = () => {
  const [recipes, setRecipes] = useState([
  ]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/recipes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error("Error fetching recipes", error));
  }, []);

  return (
    <div>
      <Navbar />
      <Typography variant="h4" gutterBottom style={{ paddingTop: 50, paddingBottom: 30, paddingRight: 40, paddingLeft: 40 }}>
        Featured Recipes
      </Typography>
      <Grid container spacing={4} style={{ paddingLeft: 40, paddingRight: 40 }}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:5000/${recipe.image}`}
                alt={recipe.title}
              />
              <CardContent>
                <Typography variant="h5">{recipe.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {recipe.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={`/recipe/${recipe._id}`}
                >
                  View Recipe
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
