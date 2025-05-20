import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Grid, Alert } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would call your backend API to send the reset email
    setSubmitted(true);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 4, m: 2 }}>
          <Typography variant="h4" gutterBottom>Forgot Password</Typography>
          {submitted ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              If an account with that email exists, a password reset link has been sent.
            </Alert>
          ) : (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                required
                placeholder="Enter your email"
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Send Reset Link
              </Button>
            </Box>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <img src="/images/hero-image.jpg" alt="Forgot Password Visual" style={{ maxWidth: '100%', borderRadius: 8 }} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword; 