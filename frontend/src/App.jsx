import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Navigation from "./pages/Navigation";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

function App() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const ProtectedRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" />;
    return children;
  };

  // hide navbar on login & signup
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      {!hideNavbar && <Navigation />}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={user ? "/menu" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default App;
