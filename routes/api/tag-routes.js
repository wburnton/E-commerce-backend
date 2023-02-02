const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data 
  try { 
    const tag = await Tag.findAll({ 
      include: [ { 
        model: Product
      }]
    }); 
    res.json(tag)
  } catch (err) { 
    res.status(500).json(err); 

  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data 
  try { 
    const tagId = await Tag.findByPk(req.params.id, { 
        include: [{ 
        model: Product
      }]
    }); 
    if (!tagId) { 
      res.status(404).json({error: "No tag under this ID"}) 
      return;
    }  
    res.status(200).json(tagId);
  } catch (err) { 
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag 
  try{ 
    const newTag= await Tag.create(req.body.tag_name) 
    res.status(200).json(newTag); 
  } catch(err) { 
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value 
  try { 
    const tagData = await Tag.update(req.body, { 
      where: {
        id: req.params.id,
      }
    }) 
    if (tagData) {
      res.json(tagData);
    } else {
      res.status(404).json({ error: "No tag with this ID" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value 
  try { 
    const tagData = await Tag.destroy({ 
      where: { 
        id: req.params.id
      }
    }) 
    if (!tagData) { 
      res.status(404).json({ message: " No tag found with this id"})
    } 

    res.status(200).json(tagData);
  } catch (err) { 
    res.status(500).json(err);
  }
});

module.exports = router;
