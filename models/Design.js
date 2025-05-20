const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['custom', 'ai-generated'],
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
    designData: {
        type: Object,
        required: true
    },
    aiPrompt: {
        type: String,
        required: function() {
            return this.type === 'ai-generated';
        }
    },
    images: [{
        type: String,
        required: true
    }],
    specifications: {
        dimensions: {
            length: Number,
            width: Number,
            height: Number
        },
        colors: [String],
        finishes: [String],
        additionalNotes: String
    },
    status: {
        type: String,
        enum: ['draft', 'completed', 'ordered'],
        default: 'draft'
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
designSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Design', designSchema); 