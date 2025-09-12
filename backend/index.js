const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// In-memory storage (demo purpose)
const users = [];
const orders = [];
const menu = [
  { id: 1, name: "Pizza", description: "Cheesy delight", price: 8.99 },
  { id: 2, name: "Burger", description: "Juicy beef burger", price: 5.99 },
  { id: 3, name: "Pasta", description: "Italian pasta with sauce", price: 6.99 }
];

// Root route
app.get("/", (req, res) => res.send("Food Ordering App Backend Running!"));

// Signup
app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  const exists = users.find(u => u.username === username);
  if (exists) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  // Generate JWT token
  const token = jwt.sign({ username }, "SECRET_KEY", { expiresIn: "1h" });

  res.json({ message: "Signup successful", username, token });
});

// Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ username }, "SECRET_KEY", { expiresIn: "1h" });
  res.json({ message: "Login successful", username, token });
});

// Get menu
app.get("/api/menu", (req, res) => res.json(menu));

// Place order
app.post("/api/order", (req, res) => {
  const { username, items } = req.body;

  if (!username || !items || !Array.isArray(items) || items.length === 0)
    return res.status(400).json({ message: "Username and items are required" });

  const order = {
    id: orders.length + 1,
    username,
    items,
    status: "Pending",
  };

  orders.push(order);
  res.json({ message: "Order placed successfully!", order });
});

// Get orders
app.get("/api/orders", (req, res) => res.json(orders));

// Update order status
app.put("/api/order/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = orders.find(o => o.id == id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = status;
  res.json({ message: "Order status updated", order });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
