import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, Form, Col } from 'react-bootstrap';
import { emitJoin } from '../socket';
import logger from '../utils/logger';

const SignIn = ({ room, user, setUser, queueMembers }) => {
  const [newName, setNewName] = useState('');
  const [alertText, setAlertText] = useState('');

  // keep track of input component so we can focus on it
  const nameInputRef = React.createRef();

  // if popup is visible, focus on name input component
  useEffect(() => {
    // eslint-disable-next-line react/no-find-dom-node
    ReactDOM.findDOMNode(nameInputRef.current).focus();

  }, [nameInputRef]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newName.trim() === '') {
      setAlertText('Your name can\'t be empty! Please type something in.');
    } else {
      const existingQueueMember = queueMembers.find(u => u.name === newName);

      if (existingQueueMember) {
        setAlertText('Name is already taken, please try something else.');
      } else {
        // join the room and set existing queue
        emitJoin({ roomId: room.id }, (resData) => {
          logger.info('acknowledged from JOIN event', resData);
          const { error } = resData;

          if (!error) {
            // can also process and return current user from server
            const currentUser = {
              ...user,
              name: newName,
              roomId: room.id
            };

            setUser(currentUser);

            // cache user data
            logger.info('caching current user data...');
            const userJSON = JSON.stringify(currentUser);
            localStorage.setItem('signedInUser', userJSON);
          } else {
            logger.error(error);
          }
        });
      }
    }
  };

  return (
    <Container className="mt-4">
      <div className="text-center mb-4">
        <h1>Sign In</h1>
        <h3><u>{room ? room.name : ''}</u></h3>
      </div>
      <Form>
        <Form.Row className="justify-content-center mb-3">
          <Col xs="auto">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              ref={nameInputRef}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Bobby"
            />
          </Col>
        </Form.Row>
        <Form.Row className="justify-content-center mb-2">
          <Col xs="auto">
            <Form.Text className="text-muted">
              {alertText}
            </Form.Text>
          </Col>
        </Form.Row>
        <Form.Row className="justify-content-center">
          <Col xs="auto">
            <Button
              onClick={handleSubmit}
              variant="primary"
              type="submit"
            >
              Enter Room
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
};

export default SignIn;