import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import socket, { SocketEvents, emitEnqueue, emitDequeue } from '../socket';
import logger from '../utils/logger';

import SignIn from './SignIn';
import Queue from './Queue';
import { UserTypes } from '../types';

const Room = ({ room, user, setUser }) => {
  // const [users, setUsers] = useState([]);
  // const [queueUsers, setQueueUsers] = useState([]);
  const [queueMembers, setQueueMembers] = useState([]);
  const [inQueue, setInQueue] = useState(false);
  // const [name, setName] = useState('');

  // subscribe to relevant socket events
  useEffect(() => {
    // // when another user joins, add them to user list
    // socket.on(SocketEvents.NEW_USER_JOIN, ({ newUser }) => {
    //   logger.info('received JOIN event', newUser);
    //   addNewUser(newUser);
    // });

    // // when another user leaves, remove them from user list
    // socket.on(SocketEvents.LEAVE, ({ leftUser }) => {
    //   logger.info('received LEAVE event', leftUser);
    //   removeUser(leftUser.id);
    //   removeQueueUser(leftUser.id);
    // });

    // when another user joins queue, add them to queue list
    socket.on(SocketEvents.ENQUEUE, ({ enqueuedUser }) => {
      logger.info('received ENQUEUE event', enqueuedUser);
      addQueueMember(enqueuedUser);

      if (enqueuedUser.name === user.name) {
        setInQueue(true);
      }
    });

    // when another user leaves queue, remove from to queue list
    socket.on(SocketEvents.DEQUEUE, ({ dequeuedUser }) => {
      logger.info('received DEQUEUE event', dequeuedUser);
      removeQueueMember(dequeuedUser.name);

      if (dequeuedUser.name === user.name) {
        setInQueue(false);
      }
    });

    // // when another user gets updated, replace their status in your list.
    // socket.on(SocketEvents.UPDATE_USER, ({ updatedUser }) => {
    //   logger.info('received UPDATE_USER event', updatedUser);
    //   replaceUser(updatedUser);

    //   // If current user is the one who got updated, update that state too.
    //   if (updatedUser.id === user.id) {
    //     setUser(updatedUser);
    //   }
    // });

    // on component unmount, disconnect and turn off socket
    return () => {
      socket.emit(SocketEvents.DISCONNECT);
      socket.off();
    };
  }, [queueMembers]);

  const addQueueMember = (queueMember) => {
    setQueueMembers(queueMembers.concat(queueMember));
  };

  const removeQueueMember = (name) => {
    setQueueMembers(queueMembers.filter(m => m.name !== name));
  };

  // const makeAdmin = (userToUpdate) => {
  //   const reqData = {
  //     ...userToUpdate,
  //     type: UserTypes.ADMIN
  //   };

  //   socket.emit(SocketEvents.UPDATE_USER, reqData, (resData) => {
  //     logger.info('acknowledged from UPDATE_USER event', resData);
  //     const { updatedUser, error } = resData;

  //     if (!error) {
  //       replaceUser(updatedUser);
  //     }
  //   });
  // };

  const copyLinkToClipboard = () => {
    // TODO manipulating DOM here directly feels sketchy, doing it the react way doesn't work see comments below
    var dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  };

  const errorAcknowledgementCallback = (event) => {
    return (resData) => {
      logger.info(`acknowledged from ${event} event`, resData);
      logger.error(resData.error);
    };
  };

  const handleQueueToggle = () => {
    if (inQueue) {
      emitDequeue(
        { name: user.name, roomId: room.id },
        errorAcknowledgementCallback(SocketEvents.DEQUEUE)
      );
    } else {
      emitEnqueue(
        { name: user.name, roomId: room.id, type: UserTypes.BASIC },
        errorAcknowledgementCallback(SocketEvents.ENQUEUE)
      );
    }
  };

  // user is considered signed in when name and id exist
  const isUserSignedIn = user && user.name && user.name.trim().length !== 0;
  // const isNameEmpty = user.name.trim().length === 0;

  return (
    <Container className="mt-4">
      {isUserSignedIn ?
        <React.Fragment>
          <Row>
            <Col>
              <h1>{room.name}</h1>
            </Col>
            <Col xs="auto">
              <h3>Welcome, <i>{user.name}</i></h3>
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
                queueUsers={queueMembers}
                removeQueueUser={removeQueueMember}
                setInQueue={setInQueue}
              />
            </Col>
          </Row>
        </React.Fragment>
        :
        <SignIn
          room={room}
          user={user}
          setUser={setUser}
          addQueueMember={addQueueMember}
        />
      }
      {/* strangely enough, doing this doesn't work for copying to clipboard - setting display to none causes the copied value to be "window.location.href" */}
      {/* <textarea ref={linkRef} style={{ display: 'none' }} value={window.location.href}/> */}
    </Container>
  );
};

export default Room;