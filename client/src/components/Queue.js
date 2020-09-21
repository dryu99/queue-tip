import React from 'react';
import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import { UserTypes } from '../enums';
import User from './User';

const Queue = ({ user, queueUsers }) => {
  return (
    <div >
      <h4>Queue</h4>
      <ListGroup>
        {queueUsers.map((qu, i) => {
          const isCurrentUser = user.name === qu.name;

          const listItemProps = {
            // variant: isCurrentUser ? 'secondary' : null,
            action: user.type === UserTypes.ADMIN ? true : false,
            // onClick: isAdmin ? removeFromQueue : null
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

