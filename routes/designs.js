const express = require('express');
const router = express.Router();
const Design = require('../models/Design');

// Get all designs (with filtering)
router.get('/', async (req, res) => {
    try {
        const { category, material, type, isPublic } = req.query;
        let query = {};

        if (category) query.category = category;
        if (material) query.material = material;
        if (type) query.type = type;
        if (isPublic) query.isPublic = isPublic === 'true';

        const designs = await Design.find(query)
            .populate('user', 'name')
            .sort({ createdAt: -1 });
        res.json(designs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single design
router.get('/:id', async (req, res) => {
    try {
        const design = await Design.findById(req.params.id)
            .populate('user', 'name')
            .populate('likes', 'name');
        
        if (!design) {
            return res.status(404).json({ message: 'Design not found' });
        }
        res.json(design);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new design
router.post('/', async (req, res) => {
    try {
        const design = new Design({
            ...req.body,
            user: req.user.id
        });
        await design.save();
        res.status(201).json(design);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Generate design (mock version without AI)
router.post('/generate', async (req, res) => {
    try {
        const { prompt, category, material } = req.body;

        // Create a mock design specification
        const mockDesignSpec = `Design Specification for ${category}:
- Material: ${material}
- Style: Modern and functional
- Features:
  * Durable construction
  * Ergonomic design
  * Easy maintenance
- Dimensions: Standard size for ${category}
- Additional Notes: ${prompt}`;

        // Create new design with mock specifications
        const design = new Design({
            name: `Generated ${category}`,
            type: 'generated',
            category,
            material,
            aiPrompt: prompt,
            designData: {
                specifications: mockDesignSpec
            },
            user: req.user.id
        });

        await design.save();
        res.status(201).json(design);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update design
router.put('/:id', async (req, res) => {
    try {
        const design = await Design.findById(req.params.id);
        
        if (!design) {
            return res.status(404).json({ message: 'Design not found' });
        }

        // Check if user owns the design
        if (design.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedDesign = await Design.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedDesign);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete design
router.delete('/:id', async (req, res) => {
    try {
        const design = await Design.findById(req.params.id);
        
        if (!design) {
            return res.status(404).json({ message: 'Design not found' });
        }

        // Check if user owns the design
        if (design.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await design.remove();
        res.json({ message: 'Design removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Like/Unlike design
router.put('/:id/like', async (req, res) => {
    try {
        const design = await Design.findById(req.params.id);
        
        if (!design) {
            return res.status(404).json({ message: 'Design not found' });
        }

        // Check if design has already been liked by user
        const likeIndex = design.likes.indexOf(req.user.id);
        
        if (likeIndex === -1) {
            design.likes.push(req.user.id);
        } else {
            design.likes.splice(likeIndex, 1);
        }

        await design.save();
        res.json(design);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 