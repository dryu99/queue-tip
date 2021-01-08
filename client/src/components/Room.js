import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import socket, { SocketEvents, emitJoin } from '../socket';
import logger from '../utils/logger';

import RoomName from './RoomName';
import RoomActions from './RoomActions';
import Queue from './Queue';
import AdminPopup from './AdminPopup';

import './room.css';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { RoomContext } from '../context/RoomContext';
import { UserContext } from '../context/UserContext';

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

const AdminView = () => {
  return (
    <div>
      <h2>Admin View</h2>
    </div>
  );
};

const ParticipantView = () => {
  return (
    <div>
      <h2>Participant View</h2>
    </div>
  );
};

const Room = ({ room }) => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [queue, setQueue] = useState([]);

  // join room on server + receive info on current room state
  useEffect(() => {
    socket.emit(SocketEvents.JOIN, user, (res) => {
      const { users, queue, error } = res;

      if (!error) {
        setUsers(users);
        setQueue(queue);
      } else {
        logger.error(error);
      }
    });
  }, [setQueue, setUsers, user]);

  // subscribe to relevant socket events
  useEffect(() => {
    // when new users join the room, update current user state
    socket.on(SocketEvents.JOIN, ({ user }) => {
      logger.info('join', user);
      setUsers(users.concat(user));
    });

    // unsubscribe from listeners
    return () => {
      socket.off();
    };
  }, [setUsers, users]);

  // const currQueuePos

  return (
    <div>
      <h2>Room {room.name}</h2>
      <h3>Hi {user.name}</h3>
      <p>{users.length} users currently in room</p>
      {
        user.isAdmin
          ? <AdminView />
          : <ParticipantView />
      }
    </div>
  );
};

export default Room;