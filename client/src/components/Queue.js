import React from 'react';
import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import User from './User';

const Queue = ({ isAdmin, user, queueUsers, setQueueUsers }) => {

  // const removeFromQueue = (e) => {
  //   const nameToRemove = e.target.textContent;
  //   setQueueUsers(queueUsers.filter(qu => qu.name !== nameToRemove));
  // };

  return (
    <div >
      <h4>Queue</h4>
      <ListGroup>
        {queueUsers.map((qu, i) => {
          const isUserCurrent = user.name === qu.name;

          const listItemProps = {
            variant: isUserCurrent ? 'secondary' : null,
            action: isAdmin ? true : false,
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
                    <User currentUser={user} user={qu}/>
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

