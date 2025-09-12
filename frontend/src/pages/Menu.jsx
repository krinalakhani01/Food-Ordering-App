import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {menu.map(item => (
          <div key={item.id} className="border p-4 rounded shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="font-bold mt-2">₹{item.price}</p>
            <button
              className="bg-blue-500 text-white px-3 py-1 mt-3 rounded hover:bg-blue-600"
              onClick={() => addToCart({ ...item })}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
