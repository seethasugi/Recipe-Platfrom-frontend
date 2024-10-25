import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const BackgroundLayout = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        console.log("ress", res)
                        setProfile(res.data);
                        handleLogin(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );


    const handleLogin = (profileData) => {
        axios
            .post(`http://localhost:5000/api/auth/register`, {
                name: profileData.name,
                email: profileData.email,
                googleId: profileData.id,
                Picture: profileData.Picture,
                VerifiedEmail: true
            })
            .then((res) => {
                console.log("ress", res)
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("userName", profileData.name)
                localStorage.setItem('userId',res.data._id)
                navigate('/dashboard')

            })
            .catch((err) => console.log(err));

    }

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url(https://images.unsplash.com/photo-1504674900247-0877df9cc836)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                zIndex: 1,
                ':before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Dark overlay
                    zIndex: 2,
                },
            }}
        >
            <Container
                sx={{
                    zIndex: 3,  // Place content above the overlay
                    textAlign: 'center',
                    color: '#fff',
                }}
            >
                <Typography variant="h2" fontWeight="bold" gutterBottom>
                    Welcome to the Recipe Sharing Platform
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Explore delicious recipes, share your own, and learn from the best chefs around the world.
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => login()}
                    sx={{ mt: 4 }}
                >
                    Sign in with Google
                </Button>
            </Container>
        </Box>
    );
};

export default BackgroundLayout;
