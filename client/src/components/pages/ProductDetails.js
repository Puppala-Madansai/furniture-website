import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Rating,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, addReview } from '../../features/products/productsSlice';
import { addToCart } from '../../features/cart/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProduct: product, loading, error } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [customization, setCustomization] = useState({
    color: '',
    finish: '',
    size: '',
  });

  const [review, setReview] = useState({
    rating: 0,
    comment: '',
  });

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const handleCustomizationChange = (field, value) => {
    setCustomization((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    dispatch(addReview({ productId: id, reviewData: review }));
    setReview({ rating: 0, comment: '' });
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      product: product._id,
      quantity: 1,
      customization,
    }));
    navigate('/cart');
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

  if (!product) {
    return (
      <Container>
        <Alert severity="info">Product not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <img
              src={product.images[0]}
              alt={product.name}
              style={{ width: '100%', height: 'auto', borderRadius: 4 }}
            />
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {product.images.slice(1).map((image, index) => (
                <Grid item xs={4} key={index}>
                  <img
                    src={image}
                    alt={`${product.name} ${index + 2}`}
                    style={{ width: '100%', height: 'auto', borderRadius: 4 }}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} readOnly precision={0.5} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({product.reviews.length} reviews)
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            {/* Customization Options */}
            {product.isCustomizable && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Customization Options
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Color</InputLabel>
                      <Select
                        value={customization.color}
                        label="Color"
                        onChange={(e) => handleCustomizationChange('color', e.target.value)}
                      >
                        {product.customizationOptions.colors.map((color) => (
                          <MenuItem key={color} value={color}>
                            {color}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Finish</InputLabel>
                      <Select
                        value={customization.finish}
                        label="Finish"
                        onChange={(e) => handleCustomizationChange('finish', e.target.value)}
                      >
                        {product.customizationOptions.finishes.map((finish) => (
                          <MenuItem key={finish} value={finish}>
                            {finish}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Size</InputLabel>
                      <Select
                        value={customization.size}
                        label="Size"
                        onChange={(e) => handleCustomizationChange('size', e.target.value)}
                      >
                        {product.customizationOptions.sizes.map((size) => (
                          <MenuItem key={size} value={size}>
                            {size}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleAddToCart}
              sx={{ mt: 3 }}
            >
              Add to Cart
            </Button>
          </Paper>
        </Grid>

        {/* Reviews Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Reviews
            </Typography>
            {isAuthenticated && (
              <Box component="form" onSubmit={handleReviewSubmit} sx={{ mb: 3 }}>
                <Rating
                  value={review.rating}
                  onChange={(_, value) => setReview((prev) => ({ ...prev, rating: value }))}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Write a review"
                  value={review.comment}
                  onChange={(e) => setReview((prev) => ({ ...prev, comment: e.target.value }))}
                  sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary">
                  Submit Review
                </Button>
              </Box>
            )}
            <Divider sx={{ my: 2 }} />
            <List>
              {product.reviews.map((review, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating value={review.rating} readOnly size="small" />
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {new Date(review.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      }
                      secondary={review.comment}
                    />
                  </ListItem>
                  {index < product.reviews.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails; 