import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Divider, 
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip
} from '@mui/material';
import { 
  ShoppingCart as CartIcon,
  Payment as PaymentIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [orderItems] = useState([
    { id: 1, title: 'The Great Gatsby', price: 10, quantity: 1, imageUrl: 'https://images.gr-assets.com/books/1490528560l/4671.jpg' },
    { id: 2, title: 'To Kill a Mockingbird', price: 12, quantity: 2, imageUrl: 'https://images.gr-assets.com/books/1327942880l/2657.jpg' }
  ]);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const orderTotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = orderTotal * 0.08;
  const total = orderTotal + tax;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would integrate with Stripe or other payment processor
    alert('Payment processing would be implemented here with Stripe integration');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column - Payment Form */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PaymentIcon sx={{ mr: 1 }} />
              Payment Information
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Cardholder Name"
                    value={paymentInfo.cardholderName}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardholderName: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={paymentInfo.expiryDate}
                    onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    label="CVV"
                    placeholder="123"
                    value={paymentInfo.cvv}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                  />
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, py: 1.5, fontSize: '1.1rem', fontWeight: 600 }}
              >
                Pay ${total.toFixed(2)}
              </Button>
            </Box>
          </Card>

          <Alert severity="info">
            This is a demo checkout page. In a real application, this would integrate with Stripe or another payment processor for secure payment processing.
          </Alert>
        </Grid>

        {/* Right Column - Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 24 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CartIcon sx={{ mr: 1 }} />
              Order Summary
            </Typography>
            
            <List sx={{ mb: 2 }}>
              {orderItems.map((item) => (
                <ListItem key={item.id} sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar src={item.imageUrl} alt={item.title} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={`Qty: ${item.quantity}`}
                  />
                  <Typography variant="body2" fontWeight={600}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
            </List>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Subtotal:</Typography>
              <Typography>${orderTotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Shipping:</Typography>
              <Typography>Free</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Tax:</Typography>
              <Typography>${tax.toFixed(2)}</Typography>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" fontWeight={700}>Total:</Typography>
              <Typography variant="h6" fontWeight={700}>
                ${total.toFixed(2)}
              </Typography>
            </Box>
            
            <Chip 
              label="Free Shipping" 
              color="success" 
              size="small" 
              sx={{ width: '100%' }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout; 