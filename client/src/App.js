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

import { emitCheckRoom, emitJoin } from './socket';
import NavHeader from './components/NavHeader';

function App() {
  const [room, setRoom] = useState(null);
  const [queuedUsers, setQueuedUsers] = useState([]);
  const [roomError, setRoomError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const match = useRouteMatch('/room/:id');

  /**
   * If user entered via link:
   *   1) check to see if specified room id exists, if so init room and queue.
   *   2) if room exists, check local storage for cached user data and try to join room
   */
  useEffect(() => {
    if (match && !room) {
      logger.info('emitting room check event');

      // check to see if room exists on server, if so set room and queued users on client
      emitCheckRoom(match.params.id, (resData) => {
        logger.info('acknowledged from CHECK ROOM event', resData);
        const { room, queuedUsers, error } = resData;

        if (room && !error) {
          setRoom(room);
          setQueuedUsers(queuedUsers);

          // checkLocalStorage();
        } else {
          logger.error(error);
          setRoomError('sorry room doesn\'t exist...');
        }
      });
    }
  }, [match, room]);

  // const checkLocalStorage = () => {
  //   logger.info('checking local cache for signed in user data...');
  //   const userJSON = localStorage.getItem('signedInUser');

  //   if (userJSON) {
  //     logger.info('found data in local cache!');
  //     const parsedUser = JSON.parse(userJSON);
  //     logger.info(parsedUser);

  //     // try to join room found in user json
  //     emitJoin({ roomId: parsedUser.roomId }, (resData) => {
  //       logger.info('acknowledged from JOIN event', resData);
  //       const { error } = resData;

  //       if (!error) {
  //         setCurrentUser(parsedUser);
  //       } else {
  //         logger.error(error);
  //       }
  //     });
  //   }
  // };

  return (
    <React.Fragment>
      <NavHeader />
      <Switch className="mt-4">
        <Route path="/room/:id">
          {!roomError && room ?
            <Room
              room={room}
              queueMembers={queuedUsers}
              setQueueMembers={setQueuedUsers}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
            />
            :
          // would be nice to put a spinner or sth here
            <Error text={roomError}/>
          }
        </Route>
        <Route exact path="/">
          <Home
            setIsAdmin={setIsAdmin}
            setRoom={setRoom}
            setRoomError={setRoomError}
          />
        </Route>
        <Route>
          <Error text="404 resource not found"/>
        </Route>
      </Switch>
      {/* <Notification /> */}
    </React.Fragment>
  );
}

export default App;
