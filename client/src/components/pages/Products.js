import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productsSlice';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.products);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    material: '',
    priceRange: [0, 1000],
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesMaterial = !filters.material || product.material === filters.material;
    const matchesPrice =
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];

    return matchesSearch && matchesCategory && matchesMaterial && matchesPrice;
  });

  const categories = [
    'doors',
    'door-frames',
    'windows',
    'window-frames',
    'chairs',
    'sofas',
    'tables',
    'beds',
    'cabinets',
    'ventilators',
  ];

  const materials = ['wood', 'iron', 'wood-iron-combination'];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Our Products
      </Typography>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Search Products"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category}
                label="Category"
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Material</InputLabel>
              <Select
                value={filters.material}
                label="Material"
                onChange={(e) => handleFilterChange('material', e.target.value)}
              >
                <MenuItem value="">All Materials</MenuItem>
                {materials.map((material) => (
                  <MenuItem key={material} value={material}>
                    {material.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ px: 2 }}>
              <Typography gutterBottom>Price Range</Typography>
              <Slider
                value={filters.priceRange}
                onChange={(_, newValue) => handleFilterChange('priceRange', newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                valueLabelFormat={(value) => `$${value}`}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Products Grid */}
      {loading ? (
        <Typography>Loading products...</Typography>
      ) : (
        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.images[0]}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => navigate('/design-studio')}
                  >
                    Customize
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No products found matching your criteria.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Products; 