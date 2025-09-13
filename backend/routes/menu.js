const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

// Get list of restaurants
router.get('/restaurants', async (req, res) => {
  const restaurants = await Menu.distinct('restaurant');
  res.json(restaurants);
});

// Get menu for selected restaurant
router.get('/:restaurant', async (req, res) => {
  const menu = await Menu.find({ restaurant: req.params.restaurant });
  res.json(menu);
});

module.exports = router;
