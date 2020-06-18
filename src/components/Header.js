import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/" className="fab fa-airbnb"></Link>
      </div>
      <div className="header-form">
        <form>
          <input
            type="text"
            placeholder="Search for type(apartment, house, room...)"
          />
          <button className="search-btn">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
      <div className="header-text">Vrabnb</div>
    </div>
  );
};

export default Header;
