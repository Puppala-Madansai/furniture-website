const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products with filtering
router.get('/', async (req, res) => {
    try {
        const { category, material, minPrice, maxPrice, sort } = req.query;
        let query = {};

        // Apply filters
        if (category) query.category = category;
        if (material) query.material = material;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Apply sorting
        let sortOption = {};
        if (sort === 'price-asc') sortOption = { price: 1 };
        else if (sort === 'price-desc') sortOption = { price: -1 };
        else if (sort === 'rating') sortOption = { rating: -1 };
        else sortOption = { createdAt: -1 };

        const products = await Product.find(query).sort(sortOption);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new product (admin only)
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update product (admin only)
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete product (admin only)
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add review to product
router.post('/:id/reviews', async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const newReview = {
            user: req.user.id,
            rating,
            comment
        };

        product.reviews.push(newReview);
        
        // Update average rating
        const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
        product.rating = totalRating / product.reviews.length;

        await product.save();
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 