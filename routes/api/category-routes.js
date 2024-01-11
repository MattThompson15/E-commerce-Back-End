const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get all categories
router.get('/', async (req, res) => {
  try {
    // Retrive all categories and include associated products
    const categories = await Category.findAll({ include: [{ model: Product}] });
    res.status(200).json(categories);
} catch (err) {
  // Handle errors
  res.status(500).json({message: 'not found'});
}
});

// Get a single category by id
router.get('/:id', async (req, res) => {
  try {
    // Find a category by its ID and include associated products
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product}] });

    if (!category) {
      // If no category is found, return an error
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    // Create a new category with the provided request body
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    // Handle errors
    res.status(400).json({ message: 'creation failure' });
  }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
  try {
    // Update a category with the provided requiest body
    const updated = await Category.update(req.body, { where: {id: req.params.id} });

    !updated[0] ? res.status(404).json({ message: 'No category found with that id!' }) : res.status(200).json(updated);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: 'update failed' });
  }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its `id` value
    const deleted = await Category.destroy({ where: { id: req.params.id } });

    !deleted
    // If no category if found, return a 404 response
    ? res.status(404).json({ message: 'No category found with that id!' }) 
    : res.status(200).json(deleted);
  }
  // Handle errors
  catch (err) {
    res.status(500).json({ message: 'delete failed', error: err.message });
  }
});

module.exports = router;
