import React from "react";
import SubNav from "./SubNav";

function RestaurantList({ menuData, onSelect }) {
  // unique restaurant names
  const restaurants = [...new Set(menuData.map(item => item["Restaurant Name"]))];

  const handleSelect = (name) => {
    onSelect(name);
    // navigation to /menu is handled in App.jsx useEffect
  };

  return (
    <div className="container">
      <div className="section">
        <div className="page-title">Restaurants</div>
        <div className="page-subtitle">Browse curated places and pick your favorite.</div>
        <SubNav />
      </div>
      <div className="grid">
        {restaurants.map((name, i) => (
          <div key={i} className="card" style={{display: 'flex', flexDirection: 'column'}}>
            <div className="card-hero" />
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{fontWeight: 700}}>{name}</div>
              <button className="btn" onClick={() => handleSelect(name)}>View menu</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;
