import React from 'react';
import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import { UserTypes } from '../types';
import User from './User';
import { emitDequeue } from '../socket';

const Queue = ({ room, isAdmin, queueUsers, currentName }) => {

  const removeUserFromQueue = (e, username) => {
    emitDequeue({ name: username, roomId: room.id });
  };

  return (
    <div >
      <h4>Queue</h4>
      <ListGroup>
        {queueUsers.map((u, i) => {
          const isCurrentUser = currentName === u.name;
          // const isAdmin = user.type === UserTypes.ADMIN;

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

