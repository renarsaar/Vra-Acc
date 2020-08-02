import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import MapContainer from './components/MapContainer';
import HotelItem from './components/HotelItem';
import { FilterContext } from './contexts/FilterContext';

// 404 Page
const NoMatch = ({ location }) => (
  <div className="nomatch">
    <h1>Sorry,</h1>
    <p>
      the page
      <code>{location.pathname}</code>
      was
      <b>not found</b>
    </p>
  </div>
);

export default function App() {
  return (
    <>
      <FilterContext>
        <Header />
        <Switch>
          <Route path="/" exact component={MapContainer} />
          <Route path="/hotel/" component={HotelItem} />
          <Route component={NoMatch} />
        </Switch>
      </FilterContext>
    </>
  );
}
