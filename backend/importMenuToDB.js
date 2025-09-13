const mongoose = require('mongoose');
const xlsx = require('xlsx');
const Menu = require('./models/Menu'); // your existing Menu model

mongoose.connect('mongodb://127.0.0.1:27017/foodOrderingApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function importExcel() {
  try {
    // Load Excel
    const workbook = xlsx.readFile('menu.xlsx');
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const menuData = xlsx.utils.sheet_to_json(worksheet);

    // Get unique restaurants
    const restaurants = [...new Set(menuData.map(item => item['Restaurant Name']))];
    console.log('Restaurants found:', restaurants);

    // Prepare menu items
    const itemsToInsert = menuData.map(item => ({
      restaurant: item['Restaurant Name'],
      category: item['Category'],
      name: item['Item Name'],
      price: item['Price'],
    }));

    // Clear old data and insert
    await Menu.deleteMany({});
    await Menu.insertMany(itemsToInsert);

    console.log('Menu items imported successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

importExcel();
