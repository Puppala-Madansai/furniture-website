import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from '@mui/material';
import {
  DesignServices as DesignIcon,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Modern Wooden Chair',
      image: '/images/chair.jpg',
      price: 299.99,
      category: 'chairs',
    },
    {
      id: 2,
      name: 'Iron Window Frame',
      image: '/images/window.jpg',
      price: 199.99,
      category: 'window-frames',
    },
    {
      id: 3,
      name: 'Wooden Door',
      image: '/images/door.jpg',
      price: 499.99,
      category: 'doors',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Design Your Dream Furniture
              </Typography>
              <Typography variant="h5" paragraph>
                Create custom furniture with our AI-powered design platform.
                Choose from a wide range of wood and iron products.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/design-studio"
                  startIcon={<DesignIcon />}
                  sx={{ mr: 2 }}
                >
                  Start Designing
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  component={RouterLink}
                  to="/products"
                  startIcon={<CartIcon />}
                >
                  Browse Products
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/hero-image.jpg"
                alt="Furniture Design"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Products */}
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom>
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    component={RouterLink}
                    to={`/products/${product.id}`}
                  >
                    View Details
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    component={RouterLink}
                    to="/design-studio"
                  >
                    Customize
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8, mt: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Why Choose Us?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <DesignIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  AI-Powered Design
                </Typography>
                <Typography>
                  Create unique furniture designs with our advanced AI technology.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <CartIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Quality Materials
                </Typography>
                <Typography>
                  Premium wood and iron materials for durable and beautiful furniture.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <DesignIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Custom Designs
                </Typography>
                <Typography>
                  Customize every aspect of your furniture to match your style.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 