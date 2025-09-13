import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import SubNav from "./SubNav";
import "../styles/MenuCard.css";

function Menu({ menuData, selectedRestaurant }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  if (!selectedRestaurant) {
    return <h2 className="container">Please select a restaurant first.</h2>;
  }

  const filteredMenu = menuData.filter(
    (item) => item["Restaurant Name"] === selectedRestaurant
  );

  return (
    <div className="container">
      <div className="section">
        <div className="page-title">{selectedRestaurant}</div>
        <div className="page-subtitle">Menu</div>
        <SubNav />
      </div>

      <div className="grid">
        {filteredMenu.map((item, i) => (
          <div key={i} className="card" style={{display:'flex', flexDirection:'column'}}>
            <div className="card-hero" />
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div>
                <div style={{fontWeight: 700}}>{item["Item Name"]}</div>
                <div className="subtle">{item["Cuisines"] || ""}</div>
              </div>
              <div className="price">₹{item.Price}</div>
            </div>
            <button className="btn" onClick={() => addToCart({ id: `${selectedRestaurant}-${i}`, name: item["Item Name"], price: Number(item.Price) }, 1)}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
