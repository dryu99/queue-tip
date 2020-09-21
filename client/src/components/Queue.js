import React from 'react';
import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import { UserTypes } from '../enums';
import User from './User';
import { emitDequeue } from '../socket';

const Queue = ({ room, user, queueUsers, removeQueueUser, setInQueue }) => {

  const removeUserFromQueue = (e, userId) => {
    emitDequeue({ userId, roomId: room.id }, (data) => {
      console.log('acknowledged from DEQUEUE event', data.dequeuedUser);
      removeQueueUser(data.dequeuedUser.id);

      if (data.dequeuedUser.id === user.id) {
        setInQueue(false);
      }
    });
  };

  return (
    <div >
      <h4>Queue</h4>
      <ListGroup>
        {queueUsers.map((qu, i) => {
          const isCurrentUser = user.name === qu.name;
          const isAdmin = user.type === UserTypes.ADMIN;

          const listItemProps = {
            // variant: isCurrentUser ? 'secondary' : null,
            action: isAdmin ? true : false,
            onClick: isAdmin ? (e) => removeUserFromQueue(e, qu.id) : null
          };

          return (
            <Container key={qu.id}>
              <Row className="align-items-center">
                <Col xs="auto">
                  <b>{i + 1}</b>
                </Col>
                <Col>
                  <ListGroup.Item {...listItemProps}>
                    <User user={qu} isCurrentUser={isCurrentUser}/>
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

