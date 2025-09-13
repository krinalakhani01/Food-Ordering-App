import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import SubNav from "./SubNav";
import "../styles/MenuCard.css";

const Cart = () => {
  const { cart, removeFromCart, updateQty, totalAmount, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handlePlaceOrder = async () => {
    if (!user) return alert("Please login");
    if (cart.length === 0) return alert("Cart is empty");

    try {
      await fetch(`${API_URL}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username, items: cart }),
      });
      clearCart();
      navigate("/orders"); // redirect to orders page
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="container">
      <div className="section">
        <div className="page-title">Your Cart</div>
        <div className="page-subtitle">Review items and place your order</div>
        <SubNav />
      </div>

      {cart.length === 0 ? (
        <div className="card">
          <p className="subtle">No items in cart</p>
        </div>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="card" style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 12}}>
              <div style={{display:'flex', alignItems:'center', gap: 12}}>
                <div className="badge">{item.qty}x</div>
                <div>{item.name}</div>
              </div>
              <div style={{display:'flex', alignItems:'center', gap: 8}}>
                <button className="btn" onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                <span>{item.qty}</span>
                <button className="btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                <div className="price">₹{(item.price * item.qty).toFixed(2)}</div>
                <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="card" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{fontWeight: 700}}>Total</div>
            <div className="price">₹{totalAmount.toFixed(2)}</div>
          </div>
          <div style={{height: 12}} />
          <button className="btn" onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default Cart;
