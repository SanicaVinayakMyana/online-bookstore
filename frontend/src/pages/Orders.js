import React, { useEffect, useState } from 'react';
import {
    Container, Typography, Box, CircularProgress, Alert, Paper, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('/api/orders/my');
                // Filter out pending carts, and sort by date descending
                setOrders(res.data.filter(order => order.status !== 'PENDING').sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)));
            } catch (err) {
                setError('Failed to fetch orders.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container sx={{ py: 8 }}>
            <Typography variant="h4" gutterBottom>My Orders</Typography>
            {orders.length === 0 ? (
                <Typography>You have no past orders.</Typography>
            ) : (
                orders.map(order => (
                    <Accordion key={order.id}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Typography sx={{ mr: 2, fontWeight: 'bold' }}>Order #{order.id}</Typography>
                                <Typography sx={{ mr: 2 }}>Date: {new Date(order.orderDate).toLocaleDateString()}</Typography>
                                <Typography sx={{ mr: 2, flexGrow: 1 }}>Total: ${order.total.toFixed(2)}</Typography>
                                <Typography>Status: {order.status}</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                           <Typography>Order details view is not created yet. This will be available in a future update.</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))
            )}
        </Container>
    );
};

export default Orders; 