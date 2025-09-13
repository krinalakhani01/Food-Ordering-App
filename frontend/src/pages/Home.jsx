import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignupClick = () => {
    if (user) logout();
    navigate("/signup");
  };

  return (
    <section className="home-hero">
      <div className="container" style={{textAlign:'center'}}>
        <h1 className="home-title">Order Food Online</h1>
        <p className="home-subtitle">Discover a seamless online food ordering experience with our modern and responsive user interface. Browse through restaurant listings, explore menus, and manage your orders effortlessly.</p>
        <div className="home-actions">
          <button className="btn btn-lg btn-pill btn-outline-orange" onClick={handleSignupClick}>Sign Up Now</button>
        </div>
      </div>
    </section>
  );
};

export default Home;


