import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';

import Home from './components/Home';
import Room from './components/Room';
import Error from './components/Error';
import Footer from './components/Footer';
import NavHeader from './components/NavHeader';

import { emitCheckRoom } from './socket';
import logger from './utils/logger';

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
        } else {
          logger.error(error);
          setRoomError('sorry room doesn\'t exist...');
        }
      });
    }
  }, [match, room]);

  return (
    <>
      <NavHeader />
      <Switch className="mt-4">
        <Route path="/room/:id">
          {roomError ?
            <Error text={roomError}/>
            : room ?
              <Room
                room={room}
                queuedUsers={queuedUsers}
                setQueuedUsers={setQueuedUsers}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
              />
              : // room is loading
              <div className="my-5 text-center">
                <Spinner className="my-5" animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
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
      <Footer />
    </>
  );
}

export default App;
