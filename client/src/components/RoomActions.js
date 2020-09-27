import React from 'react';
import { Container, Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import TooltipWrapper from './TooltipWrapper';

import logger from '../utils/logger';
import { emitEnqueue } from '../socket';

import crownIcon from '../assets/crown.png';

const RoomActions = ({ currentName, setCurrentName, isAdmin, setAdminPopupOpen, queuedUsers, room }) => {

  const joinQueue = (e) => {
    e.preventDefault();

    if (currentName.trim().length === 0) {
      alert('Name can\'t be empty if you want to join queue! Please type something in.');
    } else {
      const exisitingQueueUser = queuedUsers.find(u => u.name.toLowerCase() === currentName.toLowerCase());
      if (exisitingQueueUser) {
      // TODO make this a pretty modal
        alert('You\'re already in queue! Can\'t join again.');
      } else {
        emitEnqueue({ name: currentName, roomId: room.id }, (resData) => {
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
    <Container className="my-4">
      <Row>
        <Col>
          <Form onSubmit={joinQueue} inline>
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
            onClick={joinQueue}
            size="lg"
            block
          >
            Join Queue
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default RoomActions;