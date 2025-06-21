import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Avatar, 
  Menu, 
  MenuItem, 
  Badge,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Book as BookIcon,
  ShoppingCart as CartIcon,
  AccountCircle as AccountIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: 'background.paper',
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: 'text.primary'
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <BookIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              textDecoration: 'none', 
              color: 'inherit',
              fontWeight: 700,
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            BookStore
          </Typography>
        </Box>

        {/* Navigation Links */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2, mr: 2 }}>
            <Button 
              component={Link} 
              to="/" 
              color="inherit"
              sx={{ fontWeight: 500 }}
            >
              Home
            </Button>
            <Button 
              component={Link} 
              to="/books" 
              color="inherit"
              sx={{ fontWeight: 500 }}
            >
              Books
            </Button>
          </Box>
        )}

        {/* Dark Mode Toggle */}
        <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
          <IconButton
            onClick={toggleDarkMode}
            color="inherit"
            sx={{ mr: 1 }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>

        {/* User Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {user ? (
            <>
              {/* Cart */}
              <Tooltip title="Shopping Cart">
                <IconButton 
                  component={Link} 
                  to="/cart" 
                  color="inherit"
                  sx={{ mr: 1 }}
                >
                  <Badge badgeContent={0} color="secondary">
                    <CartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Admin Dashboard */}
              {user.roles.includes('ADMIN') && (
                <Tooltip title="Admin Dashboard">
                  <IconButton 
                    component={Link} 
                    to="/admin" 
                    color="inherit"
                    sx={{ mr: 1 }}
                  >
                    <AdminIcon />
                  </IconButton>
                </Tooltip>
              )}

              {/* User Menu */}
              <Tooltip title="Account">
                <IconButton
                  onClick={handleMenu}
                  color="inherit"
                  sx={{ ml: 1 }}
                >
                  {user.imageUrl ? (
                    <Avatar 
                      src={user.imageUrl} 
                      sx={{ width: 32, height: 32 }}
                    />
                  ) : (
                    <AccountIcon />
                  )}
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem 
                  component={Link} 
                  to="/profile" 
                  onClick={handleClose}
                >
                  Profile
                </MenuItem>
                <MenuItem 
                  component={Link} 
                  to="/orders" 
                  onClick={handleClose}
                >
                  My Orders
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button 
                component={Link} 
                to="/login" 
                color="inherit"
                sx={{ fontWeight: 500 }}
              >
                Login
              </Button>
              <Button 
                component={Link} 
                to="/register" 
                variant="contained"
                sx={{ 
                  fontWeight: 500,
                  borderRadius: 2,
                  textTransform: 'none'
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 