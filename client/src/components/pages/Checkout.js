import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../features/orders/ordersSlice';
import { clearCart } from '../../features/cart/cartSlice';

const steps = ['Shipping Information', 'Payment Details', 'Review Order'];

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const { loading, error } = useSelector((state) => state.orders);

  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    phone: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleShippingInfoChange = (field, value) => {
    setShippingInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePaymentInfoChange = (field, value) => {
    setPaymentInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    const orderData = {
      items: items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: products.find((p) => p._id === item.product)?.price,
        customization: item.customization,
      })),
      shippingAddress: {
        street: shippingInfo.street,
        city: shippingInfo.city,
        state: shippingInfo.state,
        country: shippingInfo.country,
        zipCode: shippingInfo.zipCode,
      },
      contactInfo: {
        phone: shippingInfo.phone,
      },
      totalAmount: total,
      paymentMethod: paymentInfo.method,
    };

    try {
      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      navigate('/orders');
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  const renderShippingForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Street Address"
          value={shippingInfo.street}
          onChange={(e) => handleShippingInfoChange('street', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="City"
          value={shippingInfo.city}
          onChange={(e) => handleShippingInfoChange('city', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="State/Province"
          value={shippingInfo.state}
          onChange={(e) => handleShippingInfoChange('state', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Country"
          value={shippingInfo.country}
          onChange={(e) => handleShippingInfoChange('country', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="ZIP/Postal Code"
          value={shippingInfo.zipCode}
          onChange={(e) => handleShippingInfoChange('zipCode', e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Phone Number"
          value={shippingInfo.phone}
          onChange={(e) => handleShippingInfoChange('phone', e.target.value)}
        />
      </Grid>
    </Grid>
  );

  const renderPaymentForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>Payment Method</InputLabel>
          <Select
            value={paymentInfo.method}
            label="Payment Method"
            onChange={(e) => handlePaymentInfoChange('method', e.target.value)}
          >
            <MenuItem value="credit-card">Credit Card</MenuItem>
            <MenuItem value="debit-card">Debit Card</MenuItem>
            <MenuItem value="upi">UPI</MenuItem>
            <MenuItem value="net-banking">Net Banking</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {paymentInfo.method && (
        <>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Card Number"
              value={paymentInfo.cardNumber}
              onChange={(e) => handlePaymentInfoChange('cardNumber', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Expiry Date"
              placeholder="MM/YY"
              value={paymentInfo.expiryDate}
              onChange={(e) => handlePaymentInfoChange('expiryDate', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="CVV"
              value={paymentInfo.cvv}
              onChange={(e) => handlePaymentInfoChange('cvv', e.target.value)}
            />
          </Grid>
        </>
      )}
    </Grid>
  );

  const renderOrderReview = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Shipping Information
        </Typography>
        <Typography>
          {shippingInfo.street}
          <br />
          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
          <br />
          {shippingInfo.country}
          <br />
          Phone: {shippingInfo.phone}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Payment Method
        </Typography>
        <Typography>
          {paymentInfo.method.charAt(0).toUpperCase() + paymentInfo.method.slice(1)}
          <br />
          Card ending in {paymentInfo.cardNumber.slice(-4)}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        {items.map((item) => {
          const product = products.find((p) => p._id === item.product);
          return (
            <Box key={item.product} sx={{ mb: 2 }}>
              <Typography>
                {product?.name} x {item.quantity}
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
          );
        })}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">
          Total: ${total.toFixed(2)}
        </Typography>
      </Grid>
    </Grid>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderShippingForm();
      case 1:
        return renderPaymentForm();
      case 2:
        return renderOrderReview();
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {activeStep === steps.length ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Thank you for your order!
            </Typography>
            <Typography>
              Your order has been placed successfully. You will receive a confirmation email shortly.
            </Typography>
          </Box>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Checkout; 