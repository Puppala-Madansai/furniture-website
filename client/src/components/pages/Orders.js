import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Chip,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders, cancelOrder } from '../../features/orders/ordersSlice';

const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'processing':
      return 'info';
    case 'shipped':
      return 'primary';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleCancelOrder = async (orderId) => {
    try {
      await dispatch(cancelOrder(orderId)).unwrap();
    } catch (error) {
      console.error('Failed to cancel order:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            No orders found
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products')}
          >
            Start Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>

      {orders.map((order) => (
        <Paper key={order._id} sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Order #{order._id.slice(-6).toUpperCase()}
                </Typography>
                <Box>
                  <Chip
                    label={order.orderStatus.toUpperCase()}
                    color={getStatusColor(order.orderStatus)}
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={order.paymentStatus.toUpperCase()}
                    color={order.paymentStatus === 'completed' ? 'success' : 'warning'}
                  />
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {order.items.map((item) => (
              <Grid item xs={12} key={item._id}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={item.product?.images[0]}
                    alt={item.product?.name}
                    style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }}
                  />
                  <Box sx={{ ml: 2, flexGrow: 1 }}>
                    <Typography variant="subtitle1">
                      {item.product?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantity}
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
                  </Box>
                  <Typography variant="subtitle1" color="primary">
                    ${item.price}
                  </Typography>
                </Box>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                  Total: ${order.totalAmount.toFixed(2)}
                </Typography>
                {order.orderStatus === 'pending' && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel Order
                  </Button>
                )}
              </Box>
            </Grid>

            {order.trackingNumber && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Tracking Number: {order.trackingNumber}
                </Typography>
              </Grid>
            )}

            {order.estimatedDelivery && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
      ))}
    </Container>
  );
};

export default Orders; 