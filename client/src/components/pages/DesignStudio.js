import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { generateDesign } from '../../features/designs/designsSlice';

const DesignStudio = () => {
  const dispatch = useDispatch();
  const { loading, error, generatedDesign } = useSelector((state) => state.designs);

  const [designInput, setDesignInput] = useState({
    name: '',
    category: '',
    material: '',
    prompt: '',
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

  const handleInputChange = (field, value) => {
    setDesignInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenerateDesign = () => {
    dispatch(generateDesign(designInput));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Design Studio
      </Typography>

      <Grid container spacing={4}>
        {/* Design Input Form */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Create Your Design
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Design Name"
                value={designInput.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={designInput.category}
                  label="Category"
                  onChange={(e) => handleInputChange('category', e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Material</InputLabel>
                <Select
                  value={designInput.material}
                  label="Material"
                  onChange={(e) => handleInputChange('material', e.target.value)}
                >
                  {materials.map((material) => (
                    <MenuItem key={material} value={material}>
                      {material.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Design Description"
                value={designInput.prompt}
                onChange={(e) => handleInputChange('prompt', e.target.value)}
                margin="normal"
                multiline
                rows={4}
                placeholder="Describe your design in detail. For example: 'A modern wooden chair with curved armrests and a comfortable cushion'"
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleGenerateDesign}
                disabled={loading || !designInput.prompt}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Generate Design'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Generated Design Preview */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Design Preview
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {generatedDesign ? (
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={generatedDesign.image}
                  alt={designInput.name}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {designInput.name}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {generatedDesign.description}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Specifications:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {generatedDesign.specifications}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                  >
                    Save Design
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleGenerateDesign}
                  >
                    Regenerate
                  </Button>
                </CardActions>
              </Card>
            ) : (
              <Box
                sx={{
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'grey.100',
                  borderRadius: 1,
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Your generated design will appear here
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DesignStudio; 