const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
  // find all tags, include its associated Product data through ProductTag table
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'product_tags'}]
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  
  // find a single tag by its `id` to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'product_tags'}]
    })

    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id"});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id"});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // Delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id:req.params.id
      }
    })

    if (!tagData) {
      res.status(404).json({ message: "No tag found with tah id"});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    escape.status(500).json(err);
  }
});

module.exports = router;
