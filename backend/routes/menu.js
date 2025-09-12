const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();

// Get menu items
router.get('/', async (req, res) => {
  const menu = await Menu.find();
  res.json(menu);
});

module.exports = router;
