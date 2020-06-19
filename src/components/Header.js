import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  state = { term: "" };

  onFormSubmit = (e) => {
    e.preventDefault();

    this.props.onFormSubmit(this.state.term);
  };

  onInputChange = (e) => {
    this.setState({ term: e.target.value });
  };

  render() {
    return (
      <div className="header">
        <div className="header-logo">
          <Link to="/" className="fab fa-airbnb"></Link>
        </div>
        <div className="header-form">
          <form onSubmit={this.onFormSubmit}>
            <input
              onChange={this.onInputChange}
              type="text"
              placeholder="Search for type(apartment, house, room...)"
            />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <div className="header-text">VRA Accommodations</div>
      </div>
    );
  }
}

export default Header;
