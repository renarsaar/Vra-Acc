import React from 'react';

const Context = React.createContext('room');

export class FilterContext extends React.Component {
  state = { term: "", showSearchBar: true };

  // Pass term to filter hotelList
  onTermChange = (term) => {
    this.setState({ term });
  };

  // Show search bar
  handleShowSearchBar = (value) => {
    this.setState({ showSearchBar: value });
  }

  render() {
    return (
      <Context.Provider
        value={{ ...this.state, onTermChange: this.onTermChange, handleShowSearchBar: this.handleShowSearchBar }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
