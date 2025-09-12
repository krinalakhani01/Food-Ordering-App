import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-xl">Food Order App</div>
      <div className="space-x-4">
        {user ? (
          <>
            <Link className="hover:text-yellow-300" to="/menu">Menu</Link>
            <Link className="hover:text-yellow-300" to="/cart">Cart</Link>
            <Link className="hover:text-yellow-300" to="/orders">Orders</Link>
            <button
              className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="hover:text-yellow-300" to="/login">Login</Link>
            <Link className="hover:text-yellow-300" to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
