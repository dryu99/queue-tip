import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import socket, { SocketEvents, emitEnqueue, emitDequeue } from '../socket';
import logger from '../utils/logger';

import SignIn from './SignIn';
import Queue from './Queue';
import Users from './Users';
import { UserTypes } from '../types';

const Room = ({ room, user, setUser }) => {
  const [users, setUsers] = useState([]);
  const [queueUsers, setQueueUsers] = useState([]);
  const [inQueue, setInQueue] = useState(false);

  // subscribe to relevant socket events
  useEffect(() => {
    // when another user joins, add them to user list
    socket.on(SocketEvents.NEW_USER_JOIN, ({ newUser }) => {
      logger.info('received JOIN event', newUser);
      addNewUser(newUser);
    });

    // when another user leaves, remove them from user list
    socket.on(SocketEvents.LEAVE, ({ leftUser }) => {
      logger.info('received LEAVE event', leftUser);
      removeUser(leftUser.id);
      removeQueueUser(leftUser.id);
    });

    // when another user joins queue, add them to queue list
    socket.on(SocketEvents.ENQUEUE, ({ enqueuedUser }) => {
      logger.info('received ENQUEUE event', enqueuedUser);
      addNewQueueUser(enqueuedUser);
    });

    // when another user joins queue, add them to queue list
    socket.on(SocketEvents.DEQUEUE, ({ dequeuedUser }) => {
      logger.info('received DEQUEUE event', dequeuedUser);
      removeQueueUser(dequeuedUser.id);

      if (dequeuedUser.id === user.id) {
        setInQueue(false);
      }
    });

    // when another user gets updated, replace their status in your list.
    socket.on(SocketEvents.UPDATE_USER, ({ updatedUser }) => {
      logger.info('received UPDATE_USER event', updatedUser);
      replaceUser(updatedUser);

      // If current user is the one who got updated, update that state too.
      if (updatedUser.id === user.id) {
        setUser(updatedUser);
      }
    });

    // on component unmount, disconnect and turn off socket
    return () => {
      socket.emit(SocketEvents.DISCONNECT);
      socket.off();
    };
  }, [users, queueUsers]);

  const addNewUser = (newUser) => {
    setUsers(users.concat(newUser));
  };

  const removeUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const addNewQueueUser = (newQueueUser) => {
    setQueueUsers(queueUsers.concat(newQueueUser));
  };

  const removeQueueUser = (id) => {
    setQueueUsers(queueUsers.filter(u => u.id !== id));
  };

  const replaceUser = (updatedUser) => {
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      const usersCopy = [...users];

      // replace updated user at specified index
      usersCopy.splice(index, 1, updatedUser);

      setUsers(usersCopy);
    } else {
      logger.error(`couldn't find user ${updatedUser.name} so couldn't update them`);
    }
  };

  const makeAdmin = (userToUpdate) => {
    const reqData = {
      ...userToUpdate,
      type: UserTypes.ADMIN
    };

    socket.emit(SocketEvents.UPDATE_USER, reqData, (resData) => {
      logger.info('acknowledged from UPDATE_USER event', resData);
      const { updatedUser, error } = resData;

      if (!error) {
        replaceUser(updatedUser);
      }
    });
  };


  const copyLinkToClipboard = () => {
    // TODO manipulating DOM here directly feels sketchy, doing it the react way doesn't work see comments below
    var dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  };

  const handleQueueToggle = () => {
    if (inQueue) {
      emitDequeue({ userId: user.id, roomId: room.id }, (resData) => {
        logger.info('acknowledged from DEQUEUE event', resData);
        const { dequeuedUser, error } = resData;

        if (!error) {
          removeQueueUser(dequeuedUser.id);
          setInQueue(false);
        } else {
          logger.error(error);
        }
      });
    } else {
      emitEnqueue({ userId: user.id, roomId: room.id }, (resData) => {
        logger.info('acknowledged from ENQUEUE event', resData);
        const { enqueuedUser, error } = resData;

        if (!error) {
          addNewQueueUser(enqueuedUser);
          setInQueue(true);
        } else {
          logger.error(error);
        }
      });
    }
  };

  // user is considered signed in when name and id exist
  const isUserSignedIn = user && user.name && user.id;

  return (
    <Container className="mt-4">
      {room && isUserSignedIn ?
        <React.Fragment>
          <Row>
            <Col>
              <h1>{room.name}</h1>
            </Col>
            <Col xs="auto">
              <Button onClick={copyLinkToClipboard} size="lg" variant="secondary">
                Copy Link
              </Button>
            </Col>
            <Col xs="3">
              <Button onClick={handleQueueToggle} size="lg" block>
                {inQueue ? 'Leave Queue' : 'Join Queue'}
              </Button>
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col>
              <Queue
                room={room}
                user={user}
                queueUsers={queueUsers}
                removeQueueUser={removeQueueUser}
                setInQueue={setInQueue}
              />
            </Col>
            <Col xs="3">
              <Users
                user={user}
                users={users}
                makeAdmin={makeAdmin}
              />
            </Col>
          </Row>
        </React.Fragment>
        :
        <SignIn
          room={room}
          user={user}
          setUser={setUser}
          addNewUser={addNewUser}
          addNewQueueUser={addNewQueueUser}
        />
      }
      {/* strangely enough, doing this doesn't work for copying to clipboard - setting display to none causes the copied value to be "window.location.href" */}
      {/* <textarea ref={linkRef} style={{ display: 'none' }} value={window.location.href}/> */}
    </Container>
  );
};

export default Room;