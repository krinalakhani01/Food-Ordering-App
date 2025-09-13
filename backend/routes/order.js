const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Place order
router.post('/', async (req, res) => {
  try {
    const { username, items } = req.body;
    if (!username || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Username and items are required" });
    }

    const totalAmount = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    const newOrder = new Order({ username, items, totalAmount });
    const savedOrder = await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: savedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to place order" });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;
