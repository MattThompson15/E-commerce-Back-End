const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Products not found.' });
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    !product
      ? res.status(404).json({ message: 'No product found with that id!' })
      : res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Product not found.' });
  }
});

// create new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIds = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIds);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      res.status(400).json({ message: 'Product creation failed.' });
    });
});

// update product by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Extract data from the request body
    const productData = {...req.body};
    delete productData.id;
    // Update the product with the specified id
    const updateProduct = await Product.update(productData, { where: { id: id } 
});
// Check if there are tags associated with the updated product
if (req.body.tags && req.body.tags.length > 0) {
  const productTags = await ProductTag.findAll({ where: { product_id: id } });
  const productTagIds = productTags.map(({ tag_id }) => tag_id);

  // Create an array of new product tags to be added
  const newProductTags = req.body.tags
    .filter((tag_id) => !productTagIds.includes(tag_id))
    .map((tag_id) => ({ product_id: id, tag_id}));

    // Create an array of product tags to be removed
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tags.includes(tag_id))
      .map(({ id }) => id);

    // Perform bulk operations to add new tags and remove old tags
    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);
  }

  // Retrieve the updated product inclduing associated tags
  const updatedProduct = await Product.findByPk(id, { include: [{ model: Tag }] });

  // Respond with the updated product data
  res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
    // Handle errors
    res.status(500).json({ message: 'Update failed.' });
  }
});
  

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const deleted = await Product.destroy({ where: {id: req.params.id} });

    !deleted ? res.status(404).json({ message: 'No product found with that id!' }) : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ message: 'delete failed' });
  }
});

module.exports = router;
