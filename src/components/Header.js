import React from 'react';
import { Link } from 'react-router-dom';

import FilterContext from '../contexts/FilterContext';

class Header extends React.Component {
  static contextType = FilterContext;
  state = { term: "" };

  // Change term in context
  onFormSubmit = (e) => {
    e.preventDefault();

    this.context.onTermChange(this.state.term);
  };

  // Handle input change
  onInputChange = (e) => {
    this.setState({ term: e.target.value });
  };

  render() {
    return (
      <div className="header">
        <Link to="/" className="header-text">VRA Accommodations</Link>
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
      </div>
    );
  }
}

export default Header;
