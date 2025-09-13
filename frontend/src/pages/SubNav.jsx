import React from "react";
import { NavLink } from "react-router-dom";

const SubNav = () => {
  return (
    <div className="subnav">
      <NavLink to="/restaurants" className={({isActive}) => isActive ? "active" : undefined}>Restaurants</NavLink>
      <NavLink to="/menu" className={({isActive}) => isActive ? "active" : undefined}>Menu</NavLink>
      <NavLink to="/cart" className={({isActive}) => isActive ? "active" : undefined}>Cart</NavLink>
      <NavLink to="/orders" className={({isActive}) => isActive ? "active" : undefined}>Orders</NavLink>
    </div>
  );
};

export default SubNav;


