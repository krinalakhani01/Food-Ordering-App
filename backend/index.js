const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const menuRouter = require('./routes/menu');
const orderRouter = require('./routes/order');

const app = express();

// CORS to allow Vite dev servers and CRA
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/menu', menuRouter);
app.use('/api/order', orderRouter);

// Default health route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
