const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  try{
    const tagData = await Tag.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    Tag.findOne({
        where: {
          id: req.params.id
        },
        include: [{model:Product}]
      }).then((response) => res.json(response))
    } catch (err) {
      res.status(400).json(err);
    }
});

router.post('/', (req, res) => {
  try {
    const createTagData = await Tag.create({
      tag_name : req.body.tag_name,
    });
    res.status(200).json(createTagData);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', (req, res) => {
  try {
    const updateTag = await Tag.findByPk(req.params.id);
    console.log(updateTag)
    updateTag.tag_name = req.body.tag_name;
    await updateTag.save()
    res.status(200).json(updateTag);
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
});

router.delete('/:id', (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!deleteTag) {
      res.status(400).json({ message: "No tag by this ID"})
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
