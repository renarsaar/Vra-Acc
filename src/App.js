import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import MapContainer from "./components/MapContainer";
import Footer from ".//components/Footer";
import HotelItem from "./components/HotelItem";

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={MapContainer} />
        <Route path="/hotel" component={HotelItem} />
        <Route component={NoMatch} />
      </Switch>
      <Footer />
    </div>
  );
};

// 404 Page
const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

export default App;
