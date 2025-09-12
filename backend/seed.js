const mongoose = require("mongoose");
const Menu = require("./models/Menu");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Sample menu items
const menuItems = [
  { name: "Pizza", description: "Cheesy delight", price: 8.99 },
  { name: "Burger", description: "Juicy beef burger", price: 5.99 },
  { name: "Pasta", description: "Italian pasta with sauce", price: 6.99 },
];

// Insert menu items into DB
Menu.insertMany(menuItems)
  .then(() => {
    console.log("Menu seeded successfully!");
    mongoose.disconnect();
  })
  .catch(err => console.log(err));
