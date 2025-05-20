import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Grid, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 4, m: 2 }}>
          <Typography variant="h4" gutterBottom>Login</Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              placeholder="Enter your email"
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              placeholder="Enter your password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <a href="/forgot-password" style={{ textDecoration: 'none', color: '#2E7D32', fontWeight: 500 }}>
                Forgot Password?
              </a>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <img src="/images/hero-image.jpg" alt="Login Visual" style={{ maxWidth: '100%', borderRadius: 8 }} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login; 