import React, { useEffect, useState, useRef } from 'react';
import { 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Container,
  TextField,
  InputAdornment,
  Chip,
  Rating,
  IconButton,
  CardActions,
  Skeleton,
  Alert,
  Fab,
  Tooltip,
  Drawer,
  FormControl,
  Select,
  MenuItem,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Search as SearchIcon, 
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  KeyboardArrowUp as ArrowUpIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  Close as CloseIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BooksEnhanced = ({ darkMode, toggleDarkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [quickViewBook, setQuickViewBook] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const topRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, categoriesRes] = await Promise.all([
          axios.get('/api/books'),
          axios.get('/api/books/categories')
        ]);
        setBooks(booksRes.data);
        setFilteredBooks(booksRes.data);
        setCategories(categoriesRes.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load books');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let filtered = [...books];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.tags && book.tags.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    // Price range filter
    filtered = filtered.filter(book => 
      book.price >= priceRange[0] && book.price <= priceRange[1]
    );

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(book => book.rating >= minRating);
    }

    // Sort
    if (sortBy) {
      switch (sortBy) {
        case 'price_asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating_desc':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'title_asc':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          break;
      }
    }

    setFilteredBooks(filtered);
  }, [books, searchTerm, selectedCategory, priceRange, minRating, sortBy]);

  const handleFavoriteToggle = (bookId) => {
    setFavorites(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleQuickView = (book) => {
    setQuickViewBook(book);
    setQuickViewOpen(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange([0, 50]);
    setMinRating(0);
    setSortBy('');
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, textAlign: 'center', mb: 4 }}>
          Discover Amazing Books
        </Typography>
        <Grid container spacing={3}>
          {[...Array(12)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Skeleton variant="rectangular" height={280} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
                  <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                  <Skeleton variant="text" height={20} sx={{ mb: 2 }} />
                  <Skeleton variant="text" height={60} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <div ref={topRef} />
      
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h2" 
          gutterBottom 
          sx={{ 
            fontWeight: 800, 
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Discover Amazing Books
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Explore our curated collection of {books.length} books across all genres
        </Typography>
        
        {/* Search and Filter Bar */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          <TextField
            placeholder="Search by title, author, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              minWidth: 300,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                backgroundColor: 'background.paper',
                boxShadow: 2
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          
          {!isMobile && (
            <>
              <FormControl sx={{ minWidth: 150 }}>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  displayEmpty
                  sx={{ borderRadius: 3 }}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl sx={{ minWidth: 150 }}>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  displayEmpty
                  sx={{ borderRadius: 3 }}
                >
                  <MenuItem value="">Sort By</MenuItem>
                  <MenuItem value="price_asc">Price: Low to High</MenuItem>
                  <MenuItem value="price_desc">Price: High to Low</MenuItem>
                  <MenuItem value="rating_desc">Highest Rated</MenuItem>
                  <MenuItem value="title_asc">Title A-Z</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
          
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={() => setFilterDrawerOpen(true)}
            sx={{ borderRadius: 3 }}
          >
            Filters
          </Button>
          
          <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
            <IconButton
              onClick={toggleDarkMode}
              sx={{ 
                backgroundColor: 'background.paper',
                boxShadow: 2,
                '&:hover': { backgroundColor: 'action.hover' }
              }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Books Grid */}
      <AnimatePresence>
        <Grid container spacing={3}>
          {filteredBooks.map((book, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    }
                  }}
                  elevation={2}
                  component={motion.div}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Book Cover */}
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="320"
                      image={book.imageUrl || 'https://via.placeholder.com/300x400?text=No+Image'}
                      alt={book.title}
                      sx={{ 
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        }
                      }}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,1)',
                        }
                      }}
                      onClick={() => handleFavoriteToggle(book.id)}
                      aria-label={favorites.includes(book.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      {favorites.includes(book.id) ? (
                        <FavoriteIcon color="error" />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                    <Chip
                      label={`$${book.price}`}
                      color="primary"
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        left: 8,
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(25, 118, 210, 0.9)',
                        color: 'white'
                      }}
                    />
                    {book.isBestseller && (
                      <Chip
                        label="Bestseller"
                        color="secondary"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          fontWeight: 'bold'
                        }}
                      />
                    )}
                  </Box>

                  {/* Book Content */}
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography 
                      variant="h6" 
                      component="h2" 
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
                      variant="subtitle1" 
                      color="text.secondary" 
                      gutterBottom
                      sx={{ fontWeight: 500 }}
                    >
                      by {book.author}
                    </Typography>

                    {/* Rating */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating 
                        value={book.rating} 
                        precision={0.1} 
                        size="small"
                        readOnly
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({book.reviewCount})
                      </Typography>
                    </Box>

                    {book.description && (
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          mb: 2,
                          height: '3.6em',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          lineHeight: 1.4
                        }}
                      >
                        {book.description}
                      </Typography>
                    )}

                    {/* Category */}
                    <Chip 
                      label={book.category} 
                      size="small" 
                      variant="outlined" 
                      sx={{ mb: 2 }}
                    />

                    {/* Stock Status */}
                    <Typography 
                      variant="caption" 
                      color={book.stock > 0 ? 'success.main' : 'error.main'}
                      sx={{ fontWeight: 500 }}
                    >
                      {book.stock > 0 ? `In Stock (${book.stock})` : 'Out of Stock'}
                    </Typography>
                  </CardContent>

                  {/* Card Actions */}
                  <CardActions sx={{ p: 3, pt: 0 }}>
                    <Button
                      component={Link}
                      to={`/books/${book.id}`}
                      variant="outlined"
                      fullWidth
                      sx={{ 
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      View Details
                    </Button>
                    <Tooltip title="Quick View">
                      <IconButton 
                        onClick={() => handleQuickView(book)}
                        sx={{ 
                          backgroundColor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                          }
                        }}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Add to Cart">
                      <IconButton 
                        color="primary"
                        sx={{ 
                          backgroundColor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                          }
                        }}
                      >
                        <CartIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000
            }}
          >
            <Fab
              color="primary"
              aria-label="scroll to top"
              onClick={scrollToTop}
            >
              <ArrowUpIcon />
            </Fab>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default BooksEnhanced; 