// routes/order.js
const express = require('express');
const router = express.Router(); // ✅ Define router
const Order = require('../models/Order'); // make sure this path is correct

// Place order
router.post('/', async (req, res) => {
  try {
    const { username, items } = req.body;

    if (!username || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Username and items are required' });
    }

    console.log("Received order:", req.body); // 🟢 Debug log

    // Calculate total safely
    const totalAmount = items.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 1;
      return sum + price * qty;
    }, 0);

    const newOrder = new Order({
      username,
      items,
      totalAmount,
      status: 'Pending',
    });

    await newOrder.save();

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: newOrder._id,
      status: newOrder.status,
      totalAmount: newOrder.totalAmount,
    });
  } catch (err) {
    console.error("❌ Order save failed:", err); // 🟢 Debug log
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
});

module.exports = router; // ✅ Export router
