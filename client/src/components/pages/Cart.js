import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  IconButton,
  TextField,
  Divider,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../../features/cart/cartSlice';
import { fetchProducts } from '../../features/products/productsSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const itemsWithDetails = items.map((item) => {
        const product = products.find((p) => p._id === item.product);
        return {
          ...item,
          productDetails: product,
        };
      });
      setCartItems(itemsWithDetails);
    }
  }, [items, products]);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({
        product: item.product,
        quantity: newQuantity,
        customization: item.customization,
      }));
    }
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart({
      product: item.product,
      customization: item.customization,
    }));
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg">
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      <Grid container spacing={3}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Paper key={`${item.product}-${JSON.stringify(item.customization)}`} sx={{ p: 2, mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <img
                    src={item.productDetails?.images[0]}
                    alt={item.productDetails?.name}
                    style={{ width: '100%', height: 'auto', borderRadius: 4 }}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Typography variant="h6" gutterBottom>
                    {item.productDetails?.name}
                  </Typography>
                  {item.customization && (
                    <Typography variant="body2" color="text.secondary">
                      Customization:
                      {Object.entries(item.customization).map(([key, value]) => (
                        value && (
                          <span key={key} style={{ marginLeft: 8 }}>
                            {key}: {value}
                          </span>
                        )
                      ))}
                    </Typography>
                  )}
                  <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    ${item.productDetails?.price}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item, parseInt(e.target.value) || 0)}
                      type="number"
                      size="small"
                      sx={{ width: 60, mx: 1 }}
                      inputProps={{ min: 1 }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={1}>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveItem(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography>Subtotal</Typography>
                </Grid>
                <Grid item>
                  <Typography>${total.toFixed(2)}</Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                <Grid item>
                  <Typography>Shipping</Typography>
                </Grid>
                <Grid item>
                  <Typography>Calculated at checkout</Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
              <Grid item>
                <Typography variant="h6">Total</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">${total.toFixed(2)}</Typography>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleCheckout}
            >
              {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart; 