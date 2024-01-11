const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags
router.get('/', async (req, res) => {
  try {
    // Retrive all tags and include associated products 
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err.message);
    res.status(500).json( message = 'No tags found.')
  }
});

// Get a single tag by id
router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its ID and include associated products
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: 'No tags found.' })};
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json({ message: 'Tag creation failed.' });
  }
});

// Update a tag by ID
router.put('/:id', async (req, res) => {
    try {
      // Update a tag name by its ID value
      const updated = await Tag.update(req.body, {
        where: { id: req.params.id },
      });
      !updated[0]
        ? res.status(404).json({ message: 'No tag found with that id!' })
        : res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ message: 'Update failed.' });
    }
  });

// Delete a tag by ID
router.delete('/:id', async (req, res) => {
    try {
      // Delete a tag by its `id` value
      const tagData = await Tag.destroy({
        where: { id: req.params.id },
      });
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with that id!' });
        return;
      }
      res.status(200).json({ message : 'Tag deleted.'});
    } catch (err) {
      res.status(500).json({ message: 'Delete failed.' });
    }
});

module.exports = router;
