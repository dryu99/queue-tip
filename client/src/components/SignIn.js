import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, Form, Col } from 'react-bootstrap';
import socket, { SocketEvents } from '../socket';
import { UserTypes } from '../enums';

const SignIn = ({ room, setUser, users, setUsers, queueUsers, setQueueUsers, isAdmin }) => {
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

    const userType = isAdmin ? UserTypes.ADMIN : UserTypes.BASIC;

    socket.emit(SocketEvents.JOIN, { name: newName, type: userType, roomId: room.id }, ({ user, usersInRoom, usersInQueue, error }) => {
      console.log('acknowledged from JOIN event', user);
      if (error) {
        console.error(error);
        setAlertText('Name is already taken, please try something else.');
      } else {
        setUser(user);
        setUsers([...users, ...usersInRoom, user]); // users should be always empty in this case, but w/e
        setQueueUsers([...queueUsers, ...usersInQueue]); // users should be always empty in this case, but w/e
        setAlertText('');

        // save user locally on browser
        // TODO have to make sure admin permissions get saved too i.e. user.type
        localStorage.setItem('queueTipUserData', JSON.stringify(user));
      }
    });
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-5">Sign In</h1>
      <Form>
        <Form.Row className="justify-content-center mb-3">
          <Col xs="auto">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              ref={nameInputRef}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Gregor Kiczales"
            />
          </Col>
          <Form.Text className="text-muted">
            {alertText}
          </Form.Text>
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