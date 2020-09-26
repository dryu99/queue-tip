import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button, Form, InputGroup } from 'react-bootstrap';
import socket, { SocketEvents, emitEnqueue, emitJoin } from '../socket';
import logger from '../utils/logger';
import { UserTypes } from '../types';

import Queue from './Queue';
import TooltipWrapper from './TooltipWrapper';
import AdminPopup from './AdminPopup';
import copyLinkIcon from '../assets/copy-link.png';
import crownIcon from '../assets/crown.png';
import './index.css';

const Room = ({ isAdmin, setIsAdmin, room, queueMembers, setQueueMembers }) => {
  const [currentName, setCurrentName] = useState('');
  const [adminPopupOpen, setAdminPopupOpen] = useState(false);

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
      alert('Name can\'t be empty if you want to join queue! Please type something in.');
    } else {
      const exisitingQueueUser = queueMembers.find(u => u.name.toLowerCase() === currentName.toLowerCase());
      if (exisitingQueueUser) {
      // TODO make this a pretty modal
        alert('Chosen name is already in queue! Please choose a different name.');
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

  return (
    <React.Fragment>
      <Container className="mt-4">
        <Row>
          <Col>
            <h1 className="d-inline-block">{room.name}</h1>
            <TooltipWrapper text="copy url">
              <img
                id="copy-link-icon"
                className="align-baseline mx-2"
                src={copyLinkIcon}
                alt="copy-link-icon"
                onClick={copyLinkToClipboard}
              />
            </TooltipWrapper>

          </Col>
        </Row>
        <hr/>
        <Row className="my-4">
          <Col>
            <Form inline>
              <InputGroup className="pt-1">
                <InputGroup.Prepend>
                  <InputGroup.Text>Name</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                  placeholder="Mr. Recursion"
                />
                <TooltipWrapper text={isAdmin ? 'you\'re admin!' : 'make admin'}>
                  <img
                    id="crown-icon"
                    className="align-baseline mx-2 "
                    style={{ opacity: isAdmin ? 1 : null }}
                    src={crownIcon}
                    alt="crown-icon"
                    onClick={!isAdmin ? () => setAdminPopupOpen(true) : null}
                  />
                </TooltipWrapper>
              </InputGroup>
            </Form>
          </Col>
          <Col xs="auto">
            <Button
              onClick={handleQueueToggle}
              size="lg"
              block
            >
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
      <AdminPopup
        room={room}
        setIsAdmin={setIsAdmin}
        show={adminPopupOpen}
        setAdminPopupOpen={setAdminPopupOpen}
      />
    </React.Fragment>
  );
};

export default Room;