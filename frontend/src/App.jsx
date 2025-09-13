import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import RestaurantList from "./pages/RestaurantList";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Footer from "./pages/Footer";
import Home from "./pages/Home";

import menuData from "./data/menu.json";
import "./styles/App.css";
import "./styles/Titles.css";

function App() {
  const { user, isReady } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedRestaurant, setSelectedRestaurant] = useState(
    () => localStorage.getItem("selectedRestaurant") || null
  );

  // Clear selectedRestaurant if user logs out
  useEffect(() => {
    if (!user) {
      setSelectedRestaurant(null);
      localStorage.removeItem("selectedRestaurant");
    }
  }, [user]);

  // Store selectedRestaurant in localStorage and redirect to menu after selection
  useEffect(() => {
    if (selectedRestaurant) {
      localStorage.setItem("selectedRestaurant", selectedRestaurant);
      if (location.pathname === "/restaurants") {
        navigate("/menu");
      }
    }
  }, [selectedRestaurant, location.pathname, navigate]);

  const ProtectedRoute = ({ children }) => {
    if (!isReady) return null; // wait until auth is initialized
    if (!user) return <Navigate to="/signup" />;
    return children;
  };

  if (!isReady) return null; // prevent initial flash

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        <Routes>
          {/* PUBLIC PAGES */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/restaurants" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/restaurants" />} />

          {/* SELECT RESTAURANT */}
          <Route
            path="/restaurants"
            element={
              <ProtectedRoute>
                <RestaurantList menuData={menuData} onSelect={setSelectedRestaurant} />
              </ProtectedRoute>
            }
          />

          {/* MENU PAGE */}
          <Route
            path="/menu"
            element={
              <ProtectedRoute>
                {selectedRestaurant ? (
                  <Menu menuData={menuData} selectedRestaurant={selectedRestaurant} />
                ) : (
                  <Navigate to="/restaurants" />
                )}
              </ProtectedRoute>
            }
          />

          {/* CART PAGE */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                {selectedRestaurant ? <Cart /> : <Navigate to="/restaurants" />}
              </ProtectedRoute>
            }
          />

          {/* ORDERS PAGE */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                {selectedRestaurant ? <Orders /> : <Navigate to="/restaurants" />}
              </ProtectedRoute>
            }
          />

          {/* DEFAULT ROUTE */}
          <Route
            path="*"
            element={
              !user
                ? <Navigate to="/signup" />
                : !selectedRestaurant
                ? <Navigate to="/restaurants" />
                : <Navigate to="/menu" />
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

