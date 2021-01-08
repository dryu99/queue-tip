import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import socket, { SocketEvents, emitJoin } from '../socket';
import logger from '../utils/logger';

import RoomName from './RoomName';
import RoomActions from './RoomActions';
import Queue from './Queue';
import AdminPopup from './AdminPopup';

import './room.css';
import { useHistory, useRouteMatch } from 'react-router-dom';

const OldRoom = ({ isAdmin, setIsAdmin, room, queuedUsers, setQueuedUsers }) => {
  const [currentName, setCurrentName] = useState('');
  const [adminPopupOpen, setAdminPopupOpen] = useState(false);

  // subscribe to relevant socket events
  useEffect(() => {
    // when another user joins queue, add them to queue list
    socket.on(SocketEvents.ENQUEUE, ({ enqueuedUser }) => {
      logger.info('received ENQUEUE event', enqueuedUser);
      setQueuedUsers(queuedUsers.concat(enqueuedUser));
    });

    // when another user leaves queue, remove from to queue list
    socket.on(SocketEvents.DEQUEUE, ({ dequeuedUser }) => {
      logger.info('received DEQUEUE event', dequeuedUser);
      setQueuedUsers(queuedUsers.filter(m => m.name !== dequeuedUser.name));
    });

    // on component unmount, disconnect and turn off socket
    return () => {
      socket.emit(SocketEvents.DISCONNECT);
      socket.off();
    };
  }, [queuedUsers, room]);

  // emit relevant socket events
  useEffect(() => {
    // let server know that new connection has joined this room
    emitJoin({ roomId: room.id }, (resData) => {
      logger.info('acknowledged from JOIN event', resData);
    });
  }, [room]);

  // check cache for current name data
  useEffect(() => {
    logger.info('checking local cache for signed in user data...');
    const userJSON = localStorage.getItem('currentNameData');

    if (userJSON) {
      logger.info('found data in local cache!');
      const currentNameData = JSON.parse(userJSON);
      logger.info(currentNameData);

      if (currentNameData.value) {
        setCurrentName(currentNameData.value);
      }
    }
  }, []);

  return (
    <>
      <Container className="mt-4">
        <RoomName room={room}/>
        <hr/>
        <RoomActions
          currentName={currentName}
          setCurrentName={setCurrentName}
          isAdmin={isAdmin}
          setAdminPopupOpen={setAdminPopupOpen}
          room={room}
          queuedUsers={queuedUsers}
        />
        <hr/>
        <Queue
          room={room}
          isAdmin={isAdmin}
          currentName={currentName}
          queuedUsers={queuedUsers}
        />
      </Container>
      <AdminPopup
        show={adminPopupOpen}
        room={room}
        setIsAdmin={setIsAdmin}
        setAdminPopupOpen={setAdminPopupOpen}
      />
    </>
  );
};

const Room = () => {
  const [room, setRoom] = useState(null);

  const match = useRouteMatch('/room/:id');
  const history = useHistory();

  useEffect(() => {
    if (match && !room) {
      logger.info('emitting room check event');

      // check to see if room exists on server, if so set room and queued users on client
      // try joining room (if it exists) given url param
      socket.emit(SocketEvents.JOIN, { roomId: match.params.id }, (res) => {
        logger.info('acknowledged from JOIN event', res);
        const { room, queuedUsers, error } = res;

        if (room && !error) {
          setRoom(room);
          // setQueuedUsers(queuedUsers);
        } else {
          logger.error(error);
          // setRoomError('sorry room doesn\'t exist...');
        }
      });
    }
  }, [setRoom, room, match]);

  return (
    <div>
      <h2>Room</h2>
      {
        room ?
          <div>{room.name}</div>
          :
          <p>room doesn't exist...</p>
      }
      <button onClick={() => history.push('/')}>Go Back</button>
    </div>
  );
};

export default Room;