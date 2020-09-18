import React, { useState } from 'react';
import Home from './components/Home';
import Room from './components/Room';

import {
  Switch,
  Route,
} from 'react-router-dom';


function App() {
  const [user, setUser] = useState(null);
  // const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // user is only admin if they created room

  return (
    <Switch>
      <Route path="/room/:id">
        <Room isAdmin={isAdmin} user={user} setUser={setUser}/>
      </Route>
      <Route path="/">
        <Home setIsAdmin={setIsAdmin}/>
      </Route>
    </Switch>
  );
}

export default App;
