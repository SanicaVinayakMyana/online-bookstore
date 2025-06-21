import React, { useEffect, useState } from 'react';
import {
    Container, Typography, Box, Grid, Card, CardMedia, Button, TextField, CircularProgress, Alert, Paper, IconButton, Divider
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const res = await axios.get('/api/cart');
            setCart(res.data);
        } catch (err) {
            setError('Failed to fetch cart.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleUpdateQuantity = async (orderItemId, quantity) => {
        if (quantity < 1) return;
        try {
            const res = await axios.put('/api/cart/update', { orderItemId, quantity });
            setCart(res.data);
        } catch (err) {
            setError('Failed to update cart.');
        }
    };

    const handleRemoveItem = async (orderItemId) => {
        try {
            const res = await axios.delete(`/api/cart/remove/${orderItemId}`);
            setCart(res.data);
        } catch (err) {
            setError('Failed to remove item from cart.');
        }
    };

    const handleCheckout = async () => {
        try {
            await axios.post('/api/cart/checkout');
            navigate('/orders');
        } catch (err) {
            setError('Failed to place order.');
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!cart || cart.items.length === 0) return <Typography>Your cart is empty.</Typography>;

    return (
        <Container sx={{ py: 8 }}>
            <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    {cart.items.map(item => (
                        <Card key={item.id} sx={{ display: 'flex', mb: 2 }}>
                            <CardMedia component="img" sx={{ width: 120 }} image={item.book.imageUrl} alt={item.book.title} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: 2 }}>
                                <Typography component="h5" variant="h6">{item.book.title}</Typography>
                                <Typography variant="subtitle1" color="text.secondary">${item.price.toFixed(2)}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                                    <IconButton onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}><Remove /></IconButton>
                                    <Typography sx={{ px: 2 }}>{item.quantity}</Typography>
                                    <IconButton onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}><Add /></IconButton>
                                    <IconButton onClick={() => handleRemoveItem(item.id)} sx={{ ml: 'auto' }}><Delete /></IconButton>
                                </Box>
                            </Box>
                        </Card>
                    ))}
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Order Summary</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography>Subtotal</Typography>
                            <Typography>${cart.total.toFixed(2)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6">Total:</Typography>
                            <Typography variant="h6" fontWeight="bold">${cart.total.toFixed(2)}</Typography>
                        </Box>
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            component={Link}
                            to="/checkout"
                            disabled={cart.items.length === 0}
                            sx={{ 
                                mt: 2,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 600
                            }}
                        >
                            Proceed to Checkout
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart; 