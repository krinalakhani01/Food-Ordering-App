const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const menuRouter = require('./routes/menu');
const orderRouter = require('./routes/order');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Middleware
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] })); // React frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // optional if you have static assets

// Routes
app.use('/', indexRouter); // optional, can return JSON for homepage
app.use('/api/menu', menuRouter);
app.use('/api/order', orderRouter);
app.use('/api/auth', authRouter);

// Default route for API check
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
