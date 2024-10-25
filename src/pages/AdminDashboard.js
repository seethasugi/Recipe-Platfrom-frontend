import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
    return (
        <>
            <Navbar />
            <Container style={{ marginTop: 50 }}>
                <Typography variant="h4" gutterBottom>
                    Admin Dashboard
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Button
                            component={Link}
                            to="/admin/recipesList"
                            variant="contained"
                            fullWidth
                        >
                            Manage Recipes
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button
                            component={Link}
                            to="/admin/users"
                            variant="contained"
                            fullWidth
                        >
                            Manage Users
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button
                            component={Link}
                            to="/admin/comments"
                            variant="contained"
                            fullWidth
                        >
                            Manage Comments
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default AdminDashboard;
