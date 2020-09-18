import React from 'react';
import Home from './components/Home';
import Room from './components/Room';

import {
  Switch,
  Route,
} from 'react-router-dom';


function App() {
  return (
    <Switch>
      <Route path="/room/:id">
        <Room />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
