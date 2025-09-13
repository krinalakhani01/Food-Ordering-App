import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <div className="brand">Online Food Order</div>
        <div className="links">
          {user ? (
            <button className="btn btn-danger" onClick={logout}>Logout</button>
          ) : (
            <>
              <NavLink className={({isActive}) => isActive ? "link active" : "link"} to="/login">Login</NavLink>
              <NavLink className={({isActive}) => isActive ? "link active" : "link"} to="/signup">Signup</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
