import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    axios
      .get("http://localhost:5000/api/orders")
      .then(res => {
        setOrders(res.data.filter(order => order.username === user.username));
      })
      .catch(err => console.error(err));
  }, [user]);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul className="space-y-3">
          {orders.map(order => (
            <li key={order.id} className="border p-3 rounded shadow hover:shadow-lg">
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Items:</strong> {order.items.map(i => `${i.name} x ${i.qty}`).join(", ")}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.items.reduce((sum, i) => sum + i.price * i.qty, 0)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
