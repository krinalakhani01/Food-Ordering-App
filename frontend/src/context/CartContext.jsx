import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    setCart(prevCart => {
      const existing = prevCart.find(i => i.id === item.id);
      if (existing) {
        return prevCart.map(i =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, qty: 1 }];
      }
    });
  };

  // Remove item
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(i => i.id !== id));
  };

  // Clear cart
  const clearCart = () => setCart([]);

  // Update quantity manually
  const updateQty = (id, qty) => {
    if (qty < 1) return; // prevent zero or negative
    setCart(prevCart =>
      prevCart.map(i => (i.id === id ? { ...i, qty } : i))
    );
  };

  // Total amount
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQty, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};
