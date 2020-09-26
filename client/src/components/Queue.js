import React from 'react';
import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import User from './User';
import { emitDequeue } from '../socket';
import logger from '../utils/logger';

const Queue = ({ room, isAdmin, queuedUsers, currentName }) => {

  const removeUserFromQueue = (e, username) => {
    emitDequeue({ name: username, roomId: room.id }, (resData) => {
      logger.info('DEQUEUE event acknowledged', resData);
    });
  };

  return (
    <div >
      <h4>Queue</h4>
      <ListGroup>
        {queuedUsers.map((u, i) => {
          const isCurrentUser = currentName === u.name;

          const listItemProps = {
            variant: isCurrentUser ? 'primary' : null,
            action: isAdmin ? true : false,
            onClick: isAdmin ? (e) => removeUserFromQueue(e, u.name) : null
          };

          return (
            <Container key={u.name}>
              <Row className="align-items-center">
                <Col xs="auto">
                  <b>{i + 1}</b>
                </Col>
                <Col>
                  <ListGroup.Item {...listItemProps}>
                    <User user={u} />
                  </ListGroup.Item>
                </Col>
              </Row>
            </Container>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default Queue;

