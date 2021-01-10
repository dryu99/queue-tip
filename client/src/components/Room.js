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
import { Button } from './Common';

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

const AdminView = ({ room, users, queue }) => {

  const isQueueEmpty = queue.length === 0;

  const dequeue = (e) => {
    socket.emit(SocketEvents.DEQUEUE, { roomId: room.id }, (res) => {
      const { error } = res;
      console.log(res);
      error && logger.error(error);
    });
  };

  return (
    <div>
      <h2>Admin View</h2>
      <p>{users.length} users currently in room</p>
      <ol>
        {queue.map(u =>
          <li key={u.id}>{u.name}</li>
        )}
      </ol>

      <Button disabled={isQueueEmpty} onClick={dequeue}>Dequeue</Button>
    </div>
  );
};

const ParticipantView = ({ user, queue }) => {

  const joinQueue = (e) => {
    socket.emit(SocketEvents.ENQUEUE, { userId: user.id }, (res) => {
      const { error } = res;
      console.log(res);
      error && logger.error(error);
    });
  };

  // TODO this is a bottleneck
  const isUserInQueue = queue.some(u => u.name === user.name);

  return (
    <div>
      <h2>Participant View</h2>
      <p>There are {queue.length} people in the queue.</p>
      <Button disabled={isUserInQueue} onClick={joinQueue}>Join Queue</Button>
    </div>
  );
};

const Room = () => {
  const { user } = useContext(UserContext);
  const { room, users, queue, setQueue } = useContext(RoomContext);

  // const currQueuePos

  return (
    <div>
      <h2>Room {room.name}</h2>
      <h3>Hi {user.name}</h3>
      {
        user.isAdmin ?
          <AdminView
            room={room}
            users={users}
            queue={queue}
          />
          :
          <ParticipantView
            user={user}
            queue={queue}
            setQueue={setQueue}
          />
      }
    </div>
  );
};

export default Room;