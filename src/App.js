import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import MapContainer from "./components/MapContainer";
import Footer from ".//components/Footer";
import HotelItem from "./components/HotelItem";

class App extends React.Component {
  state = { term: "" };

  onTermSubmit = (term) => {
    this.setState({ term });
  };

  render() {
    return (
      <div>
        <Header onFormSubmit={this.onTermSubmit} />
        <Switch>
          <Route
            path="/"
            exact
            component={() => <MapContainer Term={this.state.term} />}
          />
          <Route path="/hotel" component={HotelItem} />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

// 404 Page
const NoMatch = ({ location }) => (
  <div className="nomatch">
    <h1>Sorry,</h1>
    <p>
      the page <code>{location.pathname}</code> was <b>not found</b>
    </p>
  </div>
);

export default App;
