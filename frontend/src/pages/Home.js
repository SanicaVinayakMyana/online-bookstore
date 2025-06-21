import React, { useEffect, useState } from 'react';
import { 
  Typography, 
  Button, 
  Box, 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent,
  Chip,
  Rating,
  Paper,
  Stack,
  useTheme
} from '@mui/material';
import { 
  Book as BookIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await axios.get('/api/books');
        // Get first 4 books as featured
        setFeaturedBooks(response.data.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch featured books:', error);
      }
    };
    fetchFeaturedBooks();
  }, []);

  const getRandomRating = () => {
    return (Math.random() * 2 + 3).toFixed(1);
  };

  const getRandomReviews = () => {
    return Math.floor(Math.random() * 500) + 50;
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 12,
          mb: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2
                }}
              >
                Discover Your Next
                <Box component="span" sx={{ display: 'block', color: '#ffd700' }}>
                  Favorite Book
                </Box>
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4, 
                  opacity: 0.9,
                  lineHeight: 1.6
                }}
              >
                Explore our curated collection of over 20 books across all genres. 
                From timeless classics to modern bestsellers, find your perfect read.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/books"
                  sx={{
                    backgroundColor: '#ffd700',
                    color: '#333',
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    '&:hover': {
                      backgroundColor: '#ffed4e',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Browse Books
                  <ArrowForwardIcon sx={{ ml: 1 }} />
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/register"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: '#ffd700',
                      backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    }
                  }}
                >
                  Join Now
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <BookIcon 
                  sx={{ 
                    fontSize: '15rem', 
                    opacity: 0.1,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }} 
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    justifyContent: 'center',
                    maxWidth: 400
                  }}
                >
                  {featuredBooks.slice(0, 4).map((book, index) => (
                    <Card
                      key={book.id}
                      sx={{
                        width: 120,
                        height: 160,
                        transform: `rotate(${(index - 1.5) * 5}deg)`,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: `rotate(${(index - 1.5) * 5}deg) scale(1.1)`,
                        }
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="160"
                        image={book.imageUrl || 'https://via.placeholder.com/120x160?text=Book'}
                        alt={book.title}
                        sx={{ objectFit: 'cover' }}
                      />
                    </Card>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ fontWeight: 700, mb: 6 }}
        >
          Why Choose Our Bookstore?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                textAlign: 'center',
                border: '1px solid #e0e0e0',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                }
              }}
            >
              <BookIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Curated Collection
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Handpicked books across all genres, from classics to contemporary bestsellers.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                textAlign: 'center',
                border: '1px solid #e0e0e0',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                }
              }}
            >
              <ShippingIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Fast Delivery
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quick and reliable shipping to get your books to you as soon as possible.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                textAlign: 'center',
                border: '1px solid #e0e0e0',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                }
              }}
            >
              <SecurityIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Secure Shopping
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your data and transactions are protected with industry-standard security.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                textAlign: 'center',
                border: '1px solid #e0e0e0',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                }
              }}
            >
              <SupportIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                24/7 Support
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our customer support team is always here to help you with any questions.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Featured Books Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ fontWeight: 700 }}
          >
            Featured Books
          </Typography>
          <Button
            component={Link}
            to="/books"
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            View All Books
          </Button>
        </Box>
        <Grid container spacing={3}>
          {featuredBooks.map(book => (
            <Grid item xs={12} sm={6} md={3} key={book.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="280"
                  image={book.imageUrl || 'https://via.placeholder.com/300x400?text=Book'}
                  alt={book.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      lineHeight: 1.3,
                      height: '2.6em',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {book.title}
                  </Typography>
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    gutterBottom
                    sx={{ fontWeight: 500 }}
                  >
                    by {book.author}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating 
                      value={parseFloat(getRandomRating())} 
                      precision={0.1} 
                      size="small"
                      readOnly
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({getRandomReviews()})
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip 
                      label={`$${book.price}`} 
                      color="primary" 
                      sx={{ fontWeight: 'bold' }}
                    />
                    <Button
                      component={Link}
                      to={`/books/${book.id}`}
                      variant="outlined"
                      size="small"
                      sx={{ textTransform: 'none', fontWeight: 600 }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: `linear-gradient(120deg, ${theme.palette.background.paper} 60%, ${theme.palette.mode === 'dark' ? '#23272f' : '#f8fafc'} 100%)`,
          py: 8,
          borderTop: `1px solid ${theme.palette.divider}`,
          transition: 'background 0.3s',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 800, mb: 3, color: theme.palette.text.primary }}
            >
              Unlock Your Next Adventure!
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 4, lineHeight: 1.6 }}
            >
              Thousands of stories are waiting. Dive into our curated collection and find your next favorite book today.
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/books"
              sx={{
                px: 6,
                py: 2,
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '1.1rem',
                boxShadow: theme.palette.mode === 'dark' ? '0 4px 24px rgba(0,0,0,0.5)' : '0 4px 24px rgba(0,0,0,0.08)',
                color: theme.palette.getContrastText(theme.palette.primary.main),
                '&:hover': {
                  transform: 'translateY(-2px)',
                  background: theme.palette.primary.dark,
                },
                transition: 'all 0.3s ease',
              }}
            >
              Browse the Library
              <ArrowForwardIcon sx={{ ml: 1 }} />
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 