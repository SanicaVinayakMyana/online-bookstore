import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardMedia,
    Button,
    TextField,
    CircularProgress,
    Alert,
    Divider,
    Paper,
    Rating
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const BookDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewComment, setReviewComment] = useState('');
    const [cartSuccess, setCartSuccess] = useState('');
    const [reviewSuccess, setReviewSuccess] = useState('');
    const [reviewError, setReviewError] = useState('');

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const bookRes = await axios.get(`/api/books/${id}`);
                setBook(bookRes.data);
                const reviewsRes = await axios.get(`/api/reviews/book/${id}`);
                setReviews(reviewsRes.data);
            } catch (err) {
                setError('Failed to fetch book details.');
            } finally {
                setLoading(false);
            }
        };
        fetchBookDetails();
    }, [id]);

    const handleAddToCart = async () => {
        setCartSuccess('');
        setError('');
        try {
            await axios.post('/api/cart/add', { bookId: id, quantity });
            setCartSuccess('Book added to cart successfully!');
        } catch (err) {
            setError('Failed to add book to cart.');
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setReviewSuccess('');
        setReviewError('');
        try {
            const res = await axios.post(`/api/reviews/book/${id}`, {
                rating: reviewRating,
                comment: reviewComment,
            });
            setReviews([res.data, ...reviews]);
            setReviewSuccess('Review submitted successfully!');
            setReviewRating(0);
            setReviewComment('');
        } catch (err) {
            setReviewError('Failed to submit review.');
        }
    };

    if (loading) {
        return <Container sx={{ py: 8 }}><CircularProgress /></Container>;
    }

    if (error) {
        return <Container sx={{ py: 8 }}><Alert severity="error">{error}</Alert></Container>;
    }

    if (!book) {
        return <Container sx={{ py: 8 }}><Typography>Book not found.</Typography></Container>;
    }

    return (
        <Container sx={{ py: 8 }}>
            <Card elevation={3} sx={{ p: 4 }}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <CardMedia
                            component="img"
                            image={book.imageUrl || 'https://via.placeholder.com/300x450'}
                            alt={book.title}
                            sx={{ borderRadius: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h3" component="h1" gutterBottom>
                            {book.title}
                        </Typography>
                        <Typography variant="h5" color="text.secondary" gutterBottom>
                            by {book.author}
                        </Typography>
                        <Typography variant="h4" color="primary" sx={{ my: 2 }}>
                            ${book.price}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {book.description}
                        </Typography>
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                            <TextField
                                type="number"
                                label="Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                                inputProps={{ min: 1 }}
                                sx={{ width: 100 }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={handleAddToCart}
                                disabled={!user}
                            >
                                Add to Cart
                            </Button>
                        </Box>
                        {cartSuccess && <Alert severity="success" sx={{ mb: 2 }}>{cartSuccess}</Alert>}
                        {!user && <Typography color="text.secondary">You must be logged in to add items to the cart.</Typography>}
                    </Grid>
                </Grid>
            </Card>

            <Box sx={{ mt: 6 }}>
                <Typography variant="h4" gutterBottom>
                    Reviews
                </Typography>
                {user && (
                    <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
                        <Typography variant="h6" gutterBottom>Write a Review</Typography>
                        <Box component="form" onSubmit={handleReviewSubmit}>
                            <Rating
                                name="review-rating"
                                value={reviewRating}
                                onChange={(event, newValue) => {
                                    setReviewRating(newValue);
                                }}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Your Comment"
                                multiline
                                rows={4}
                                fullWidth
                                value={reviewComment}
                                onChange={(e) => setReviewComment(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <Button type="submit" variant="contained">Submit Review</Button>
                        </Box>
                        {reviewSuccess && <Alert severity="success" sx={{ mt: 2 }}>{reviewSuccess}</Alert>}
                        {reviewError && <Alert severity="error" sx={{ mt: 2 }}>{reviewError}</Alert>}
                    </Paper>
                )}
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <Paper key={review.id} elevation={1} sx={{ p: 3, mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Typography variant="subtitle1" sx={{ mr: 1 }}>{review.username}</Typography>
                                <Rating value={review.rating} readOnly />
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {new Date(review.createdAt).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body1">{review.comment}</Typography>
                        </Paper>
                    ))
                ) : (
                    <Typography>No reviews yet.</Typography>
                )}
            </Box>
        </Container>
    );
};

export default BookDetails; 