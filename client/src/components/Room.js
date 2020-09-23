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
  const [testText, setTestText] = useState('');

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

  const makeAdmin = (userToUpdate) => {
    const reqData = {
      ...userToUpdate,
      type: UserTypes.ADMIN
    };
    console.log('update data', reqData);
    if (testText !== '') {
      setTestText('');
    } else {
      setTestText('this feels wack');
    }

    // socket.emit(SocketEvents.UPDATE_USER, reqData, (resData) => {
    //   logger.info('acknowledged from UPDATE_USER event', resData);
    // });
  };


  const copyLinkToClipboard = (e) => {
    // TODO manipulating DOM here directly feels sketchy, doing it the react way doesn't work see comments below
    var dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  };

  const handleQueueToggle = (e) => {
    if (inQueue) {
      emitDequeue({ userId: user.id, roomId: room.id }, (resData) => {
        logger.info('acknowledged from DEQUEUE event', resData.dequeuedUser);
        removeQueueUser(resData.dequeuedUser.id);
        setInQueue(false);
      });
    } else {
      emitEnqueue({ userId: user.id, roomId: room.id }, (resData) => {
        logger.info('acknowledged from ENQUEUE event', resData.enqueuedUser);
        addNewQueueUser(resData.enqueuedUser);
        setInQueue(true);
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
      <h1>{testText}</h1>
    </Container>
  );
};

export default Room;