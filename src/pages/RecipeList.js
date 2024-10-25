import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/recipes', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/recipes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setRecipes(recipes.filter(recipe => recipe._id !== id));
            } catch (error) {
                console.error('Error deleting recipe:', error);
            }
        }
    };

    return (
        <>
            <AdminDashboard />
            <Container style={{ marginTop: 70 }}>
                <Typography variant="h5" gutterBottom>
                    Receipe List
                </Typography>
                <Button
                    component={Link}
                    to="/admin/recipes/add"
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: '20px' }}
                >
                    Add Recipe
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Recipe Name</TableCell>
                                <TableCell>ingredients</TableCell>
                                <TableCell>instructions</TableCell>
                                <TableCell>Views</TableCell>
                                <TableCell>Ratings</TableCell>
                                <TableCell>commentCount</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {recipes.map(recipe => (
                                <TableRow key={recipe._id}>
                                    <TableCell>{recipe.title}</TableCell>
                                    <TableCell>{recipe.ingredients.toString()}</TableCell>
                                    <TableCell>{recipe.instructions}</TableCell>
                                    <TableCell>{recipe.views}</TableCell>
                                    <TableCell>
                                        {recipe.ratings.length > 0
                                            ? (recipe.ratings.reduce((a, b) => a + b) / recipe.ratings.length).toFixed(1)
                                            : 'N/A'}
                                    </TableCell>
                                    <TableCell>{recipe.comments?.length}</TableCell>
                                    <TableCell>

                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDelete(recipe._id)}
                                            style={{ marginLeft: '10px' }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
};

export default RecipeList;
