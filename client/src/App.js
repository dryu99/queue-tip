import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import Room from './components/Room';
import Error from './components/Error';

import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';


import socket from './socket';
import { SocketEvents } from './socket';

function App() {
  const [user, setUser] = useState(null);
  // const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // user is only admin if they created room
  const [room, setRoom] = useState(null);

  const match = useRouteMatch('/room/:id');

  // if user entered via link, check to see if specified room id exists
  useEffect(() => {
    if (match && !isAdmin && !room) {
      console.log('emitting room check event');
      const roomId = match.params.id;
      socket.emit(SocketEvents.ROOM_CHECK, { roomId }, setRoomCallback);
    }
  }, [match, isAdmin, room]);

  // TODO this won't work properly because modal popup won't know to close
  // useEffect(() => {
  //   const userJSON = localStorage.getItem('currentUserData');
  //   setUser(JSON.parse(userJSON));
  // }, []);

  // event acknowledgement callback that sets room
  const setRoomCallback = ({ room, error, event }) => {
    console.log(`${event} event acknowledged`, room);
    if (room && !error) {
      setRoom(room);
    } else {
      console.error(error);
    }
  };

  return (
    <Switch className="mt-4">
      <Route path="/room/:id">
        <Room room={room} isAdmin={isAdmin} user={user} setUser={setUser}/>
      </Route>
      <Route exact path="/">
        <Home setIsAdmin={setIsAdmin} setRoomCallback={setRoomCallback}/>
      </Route>
      <Route>
        <Error text="404 resource not found"/>
      </Route>
    </Switch>
  );
}

export default App;
