import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Container,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  DesignServices as DesignIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/');
  };

  const authLinks = (
    <>
      <Button
        color="inherit"
        component={RouterLink}
        to="/design-studio"
        startIcon={<DesignIcon />}
      >
        Design Studio
      </Button>
      <Button
        color="inherit"
        component={RouterLink}
        to="/orders"
        startIcon={<PersonIcon />}
      >
        My Orders
      </Button>
      <IconButton
        color="inherit"
        component={RouterLink}
        to="/cart"
        sx={{ ml: 1 }}
      >
        <Badge badgeContent={items.length} color="secondary">
          <CartIcon />
        </Badge>
      </IconButton>
      <IconButton
        color="inherit"
        onClick={handleMenu}
        sx={{ ml: 1 }}
      >
        <PersonIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={RouterLink} to="/profile" onClick={handleClose}>
          Profile
        </MenuItem>
        {user?.role === 'admin' && (
          <MenuItem component={RouterLink} to="/admin" onClick={handleClose}>
            Admin Dashboard
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );

  const guestLinks = (
    <>
      <Button color="inherit" component={RouterLink} to="/login">
        Login
      </Button>
      <Button color="inherit" component={RouterLink} to="/register">
        Register
      </Button>
    </>
  );

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <DesignIcon sx={{ mr: 1 }} />
            Custom Furniture Design
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" component={RouterLink} to="/products">
              Products
            </Button>
            {isAuthenticated ? authLinks : guestLinks}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              color="inherit"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={RouterLink} to="/products" onClick={handleClose}>
                Products
              </MenuItem>
              {isAuthenticated ? (
                <>
                  <MenuItem component={RouterLink} to="/design-studio" onClick={handleClose}>
                    Design Studio
                  </MenuItem>
                  <MenuItem component={RouterLink} to="/orders" onClick={handleClose}>
                    My Orders
                  </MenuItem>
                  <MenuItem component={RouterLink} to="/cart" onClick={handleClose}>
                    Cart ({items.length})
                  </MenuItem>
                  {user?.role === 'admin' && (
                    <MenuItem component={RouterLink} to="/admin" onClick={handleClose}>
                      Admin Dashboard
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem component={RouterLink} to="/login" onClick={handleClose}>
                    Login
                  </MenuItem>
                  <MenuItem component={RouterLink} to="/register" onClick={handleClose}>
                    Register
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 