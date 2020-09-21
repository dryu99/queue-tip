import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import Room from './components/Room';
import Error from './components/Error';
import logger from './utils/logger';

import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';

import { emitCheckRoom } from './socket';
import { UserTypes } from './enums';

function App() {
  const [currentUser, setCurrentUser] = useState({ type: UserTypes.BASIC });
  const [room, setRoom] = useState(null);
  const [roomError, setRoomError] = useState(null);

  const match = useRouteMatch('/room/:id');

  // if user entered via link, check to see if specified room id exists and init room
  useEffect(() => {
    if (match && !room) {
      logger.info('emitting room check event');
      emitCheckRoom(match.params.id, setRoomCallback);
    }
  }, [match, room]);

  const setCurrentUserType = (type) => {
    setCurrentUser({ ...currentUser, type });
  };

  // socket event acknowledgement callback
  const setRoomCallback = (resData) => {
    const { room, error } = resData;
    logger.info('room event acknowledged', room);
    if (room && !error) {
      setRoom(room);
    } else {
      logger.info(error);
      setRoomError('sorry room doesn\'t exist...');
    }
  };

  return (
    <Switch className="mt-4">
      <Route path="/room/:id">
        {!roomError ?
          <Room room={room} user={currentUser} setUser={setCurrentUser}/>
          :
          // would be nice to put a spinner or sth here
          <Error text={roomError}/>
        }
      </Route>
      <Route exact path="/">
        <Home
          setCurrentUserType={setCurrentUserType}
          setRoomCallback={setRoomCallback}
        />
      </Route>
      <Route>
        <Error text="404 resource not found"/>
      </Route>
    </Switch>
  );
}

export default App;
