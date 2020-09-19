import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import socket, { SocketEvents } from '../socket';

const SignInPopup = ({ room, setUser, users, setUsers, queueUsers, setQueueUsers }) => {
  const [show, setShow] = useState(true);
  const [alertText, setAlertText] = useState('');
  const [name, setName] = useState('');

  // keep track of input component so we can focus on it
  const nameInputRef = React.createRef();

  // if popup is visible, focus on name input component
  useEffect(() => {
    if (show) {
      // eslint-disable-next-line react/no-find-dom-node
      ReactDOM.findDOMNode(nameInputRef.current).focus();
    }
  }, [nameInputRef, show]);

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit(SocketEvents.JOIN, { name, roomId: room.id }, ({ user, usersInRoom, usersInQueue, error }) => {
      console.log('acknowledged from JOIN event');
      if (error) {
        console.error(error);
        setAlertText('Name is already taken, please try something else.');
      } else {
        setUser(user);
        setUsers([...users, ...usersInRoom, user]); // users should be always empty in this case, but w/e
        setQueueUsers([...queueUsers, ...usersInQueue]); // users should be always empty in this case, but w/e
        setShow(false);
        setAlertText('');
      }
    });
  };

  return (
    <Modal show={show} onHide={() => null}>
      <Modal.Header>
        <Modal.Title>{'Sign In'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              ref={nameInputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Gregor Kiczales"
            />
            <Form.Text className="text-muted">
              {alertText}
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
            Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignInPopup;