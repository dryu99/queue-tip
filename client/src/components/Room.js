import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import socket, { SocketEvents, emitEnqueue, emitDequeue } from '../socket';
import logger from '../utils/logger';
import { emitJoin } from '../socket';

import Queue from './Queue';
import { UserTypes } from '../types';

const Room = ({ room, queueMembers, setQueueMembers }) => {
  const [currentName, setCurrentName] = useState('');

  // emit/subscribe to relevant socket events
  useEffect(() => {
    // let server know that new connection has joined this room
    emitJoin({ roomId: room.id }, (resData) => {
      logger.info('acknowledged from JOIN event', resData);
      // cache used name data
      // logger.info('caching current user data...');
      // const userJSON = JSON.stringify(currentUser);
      // localStorage.setItem('signedInUser', userJSON);
    });

    // when another user joins queue, add them to queue list
    socket.on(SocketEvents.ENQUEUE, ({ enqueuedUser }) => {
      logger.info('received ENQUEUE event', enqueuedUser);
      addQueueMember(enqueuedUser);
    });

    // when another user leaves queue, remove from to queue list
    socket.on(SocketEvents.DEQUEUE, ({ dequeuedUser }) => {
      logger.info('received DEQUEUE event', dequeuedUser);
      removeQueueMember(dequeuedUser.name);
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
  }, [queueMembers, room]);

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

  const handleQueueToggle = () => {
    logger.info('join queue toggle clicked');

    if (currentName.trim().length === 0) {
      alert('name can\'t be empty!');
    } else {
      const exisitingQueueUser = queueMembers.find(u => u.name.toLowerCase() === currentName.toLowerCase());
      if (exisitingQueueUser) {
      // TODO make this a pretty modal
        alert('name is already in queue, please change name');
      } else {
        emitEnqueue({ name: currentName, roomId: room.id, type: UserTypes.BASIC }, (resData) => {
          logger.info('acknowledged from ENQUEUE event', resData);
        });
      }
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1>{room.name}</h1>
        </Col>
        <Col xs="auto">
          <Form.Control
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
            placeholder="Your Name"
          />
        </Col>
        <Col xs="auto">
          <Button onClick={copyLinkToClipboard} size="lg" variant="secondary">
                Copy Link
          </Button>
        </Col>
        <Col xs="3">
          <Button onClick={handleQueueToggle} size="lg" block>
                Join Queue
          </Button>
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <Queue
            room={room}
            isAdmin={true}
            currentName={currentName}
            queueUsers={queueMembers}
            removeQueueUser={removeQueueMember}
          />
        </Col>
      </Row>
      {/* strangely enough, doing this doesn't work for copying to clipboard - setting display to none causes the copied value to be "window.location.href" */}
      {/* <textarea ref={linkRef} style={{ display: 'none' }} value={window.location.href}/> */}
    </Container>
  );
};

export default Room;