import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';

const CommentList = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/comments', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }); 
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, []);

    return (
        <>
            <AdminDashboard />

            <Container style={{ marginTop: 70 }}>
                <Typography variant="h5" gutterBottom>
                    Manage Comments
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Recipe Name</TableCell>
                                <TableCell>User</TableCell>
                                <TableCell>Comment</TableCell>
                                <TableCell>createdAt</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {comments.map(comment => (
                                <TableRow key={comment._id}>
                                    <TableCell>{comment.recipeTitle}</TableCell>
                                    <TableCell>{comment.username}</TableCell>
                                    <TableCell>{comment.text}</TableCell>
                                    <TableCell>{comment.createdAt}</TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
};

export default CommentList;
