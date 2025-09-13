import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SubNav from "./SubNav";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${API_URL}/api/order`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders from server");
        }

        const data = await response.json();
        const userOrders = data.filter(o => o.username === user.username);
        setOrders(userOrders);

      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return <div className="container"><p className="subtle">Please log in to view your orders.</p></div>;
  }

  return (
    <div className="container">
      <div className="section">
        <div className="page-title">Orders</div>
        <div className="page-subtitle">Track your recent orders and status</div>
        <SubNav />
      </div>

      {loading && <div className="card"><p className="subtle">Loading orders...</p></div>}
      {error && <div className="card"><p style={{ color: "#ff9a9a" }}>Error: {error}</p></div>}

      {!loading && !error && (
        orders.length === 0 ? (
          <div className="card"><p className="subtle">No orders placed yet.</p></div>
        ) : (
          orders.map(order => (
            <div key={order._id} className="card" style={{marginBottom: 12}}>
              <p><strong>Order ID:</strong> {order._id || "N/A"}</p>
              <p><strong>Status:</strong> {order.status || "pending"}</p>
              <p>
                <strong>Items:</strong>{" "}
                {order.items && order.items.length > 0
                  ? order.items.map(i => `${i.name || "Item"} x ${i.qty || 1}`).join(", ")
                  : "No items"}
              </p>
              <p><strong>Total:</strong> ₹{order.totalAmount || 0}</p>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default Orders;
