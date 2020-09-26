import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import socket, { SocketEvents, emitEnqueue, emitJoin } from '../socket';
import logger from '../utils/logger';
import copyLinkIcon from '../assets/copy-link.png';
import chainLinkIcon from '../assets/chain-link.png';

import Queue from './Queue';
import { UserTypes } from '../types';
import './index.css';
import TooltipWrapper from './TooltipWrapper';

const Room = ({ isAdmin, setIsAdmin, room, queueMembers, setQueueMembers }) => {
  const [currentName, setCurrentName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // emit/subscribe to relevant socket events
  useEffect(() => {
    // let server know that new connection has joined this room
    emitJoin({ roomId: room.id }, (resData) => {
      logger.info('acknowledged from JOIN event', resData);
    });

    // when another user joins queue, add them to queue list
    socket.on(SocketEvents.ENQUEUE, ({ enqueuedUser }) => {
      logger.info('received ENQUEUE event', enqueuedUser);
      setQueueMembers(queueMembers.concat(enqueuedUser));
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


  const removeQueueMember = (name) => {
    setQueueMembers(queueMembers.filter(m => m.name !== name));
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

          // cache current name data
          logger.info('caching current user data...');
          const currentNameJSON = JSON.stringify({ value: currentName });
          localStorage.setItem('currentNameData', currentNameJSON);
        });
      }
    }
  };

  const tryAdminStatus = (e) => {
    e.preventDefault();
    socket.emit(SocketEvents.TRY_ADMIN_STATUS, { adminPassword, roomId: room.id }, (resData) => {
      logger.info('acknowledged from TRY ADMIN STATUS event', resData);

      if (!resData.error) {
        setIsAdmin(true);
      } else {
        logger.error(resData.error);
        alert('Password is incorrect! Please try again.');
      }
    });
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="d-inline-block">{room.name}</h1>
          <TooltipWrapper text="Copy Link">
            <img
              id="copy-link-icon"
              className="align-baseline mx-2"
              src={copyLinkIcon}
              alt="copy-link-icon"
              onClick={copyLinkToClipboard}
            />
          </TooltipWrapper>

        </Col>
        <Col xs="auto">
          {isAdmin ?
            <span>YOU ARE ADMIN</span>
            :
            <React.Fragment>
              <Form.Control
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Admin Password"
              />
              <Button onClick={tryAdminStatus}>
              Become Admin
              </Button>
            </React.Fragment>
          }
          <Form.Control
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
            placeholder="Your Name"
          />
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
            isAdmin={isAdmin}
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