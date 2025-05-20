const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['doors', 'door-frames', 'windows', 'window-frames', 'chairs', 'sofas', 'tables', 'beds', 'cabinets', 'ventilators']
    },
    material: {
        type: String,
        required: true,
        enum: ['wood', 'iron', 'wood-iron-combination']
    },
    price: {
        type: Number,
        required: true
    },
    dimensions: {
        length: Number,
        width: Number,
        height: Number
    },
    images: [{
        type: String,
        required: true
    }],
    customizationOptions: {
        colors: [String],
        finishes: [String],
        sizes: [String]
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    isCustomizable: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: Number,
        comment: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema); 