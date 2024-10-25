import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
} from '@mui/material';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';

const AddRecipe = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [video, setVideo] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('ingredients', ingredients);
        formData.append('instructions', instructions);
        formData.append('video', video);
        formData.append('image', image);

        try {
            await axios.post('http://localhost:5000/api/recipes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            alert('Recipe added successfully!');
            // Reset form fields after successful submission
            setTitle('');
            setIngredients('');
            setInstructions('');
            setVideo('');
            setImage(null);
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    return (
        <>
            <AdminDashboard />
            <Container style={{ marginTop: 70 }}>
                <Typography variant="h5" gutterBottom>
                    Add Recipe
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Recipe Title"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Ingredients (comma-separated)"
                                variant="outlined"
                                fullWidth
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Instructions"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Video URL (optional)"
                                variant="outlined"
                                fullWidth
                                value={video}
                                onChange={(e) => setVideo(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="image-upload"
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            <label htmlFor="image-upload">
                                <Button variant="contained" component="span">
                                    Upload Image
                                </Button>
                            </label>
                            {image && <span style={{ marginLeft: '10px' }}>{image.name}</span>}
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">
                                Add Recipe
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    );
};

export default AddRecipe;
