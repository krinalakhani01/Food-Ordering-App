import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQty } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [orderStatus, setOrderStatus] = useState(null);

  const totalAmount = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handlePlaceOrder = async () => {
    if (!user) return alert("Please login to place order");
    if (cart.length === 0) return alert("Cart is empty");

    const orderItems = cart.map((i) => ({
      id: i.id,
      name: i.name,
      price: i.price,
      qty: i.qty,
    }));

    try {
      const res = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username, items: orderItems }),
      });

      const data = await res.json();
      if (res.ok) {
        setOrderStatus(data.order);
        clearCart();
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul className="mb-3">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between mb-2 items-center">
                <span>
                  {item.name} x {item.qty} - ₹{item.price * item.qty}
                </span>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    className="w-16 border rounded p-1"
                    onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                  />
                  <button
                    className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <p className="font-bold mb-3">Total: ₹{totalAmount}</p>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </>
      )}

      {orderStatus && (
        <div className="mt-5 p-4 border rounded shadow bg-green-50">
          <h2 className="text-xl font-bold mb-2">Order Placed Successfully!</h2>
          <p>
            <strong>Order ID:</strong> {orderStatus.id}
          </p>
          <p>
            <strong>Status:</strong> {orderStatus.status}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹
            {orderStatus.items.reduce((sum, i) => sum + i.price * i.qty, 0)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
