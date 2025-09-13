import React from "react";

const Footer = () => {
  return (
    <footer className="container" style={{paddingTop: 24, paddingBottom: 24}}>
      <div className="card" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div className="subtle">© {new Date().getFullYear()} Food Order App</div>
        <div style={{display:'flex', gap: 14}}>
          <a className="link" href="#">Privacy</a>
          <a className="link" href="#">Terms</a>
          <a className="link" href="#">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
