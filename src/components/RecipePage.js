import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Typography, Card, CardContent, CardMedia, List, ListItem, ListItemText, Divider, Rating, Button, TextField } from "@mui/material";
import Navbar from "./Navbar";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(
  );
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data.recipe)
      })
      .catch((error) => console.error("Error fetching recipe details", error));
  }, [id]);

  if (!recipe) return <div>Loading...</div>;
  const handleRatingChange = (event, newValue) => {
    console.log(event, newValue)
    setUserRating(newValue);
  };

  const handleSubmit =()=>{
    axios.post(`http://localhost:5000/api/recipes/${id}/comments`,{
      username: localStorage.getItem('userName'),
      text: userComment,
      ratings:userRating,
      recipeTitle:recipe.title
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }}
    )
    .then((response) => {
      setUserRating(0)
      setUserComment('')
    })
    .catch((error) => console.error("Error fetching recipe details", error));
}
  
  

  return (
    <>
      <Navbar />
      <Card style={{ paddingTop: 10 }}>
        <CardMedia
          component="div"
          style={{
            height: '500px',  // Fixed height
            width: '100%',  // Full width
            backgroundImage: `url(http://localhost:5000/${recipe.image})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
          alt={recipe.title}
        />
        <CardContent style={{ paddingLeft: 100 }}>
          <Typography variant="h4" gutterBottom>
            {recipe.title}
          </Typography>

          <Typography variant="h6">Ingredients</Typography>
          <List>
            {recipe && recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemText primary={ingredient} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ margin: "20px 0" }} />

          <Typography variant="h6">Instructions</Typography>
          <Typography variant="body1" paragraph>
            {recipe.instructions}
          </Typography>
          {/* Rating and comments */}
          <Rating
            name="recipe-rating"
            value={userRating}           // Current rating value
            onChange={handleRatingChange} // Handles when user changes the rating
            precision={0.5}              // Allows half-star ratings, adjust as needed
          />
          {/* <Rating value={recipe.averageRating}  /> */}
          <TextField label="Add a comment" fullWidth value={userComment} onChange={(e)=>setUserComment(e.target.value)}/>
          <Button variant="contained" color="primary" onClick={()=>handleSubmit()}>Submit</Button>
        </CardContent>
      </Card>
    </>
  );
};

export default RecipePage;
