const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    Category.findOne({
      where: {
        id: req.params.id
      },
      include: [Product]
    }).then((response) => res.json(response))

  } catch (err) {
    res.status(400).json(err);

  }
});

router.post('/', (req, res) => {
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', (req, res) => {
  try {
    const updateCategory = await Category.findByPk(req.params.id);
    updateCategory.category_name = req.body.category_name;
    await updateCategory.save()
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!deleteCategory) {
      res.status(400).json({
        message: "No category by this ID"
      })
      return;
    }

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
