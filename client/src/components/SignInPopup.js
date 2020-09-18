import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import socket, { SocketEvents } from '../socket';

const SignInPopup = ({ room, setUser, users, setUsers, setRoomName, setIsRoomValid }) => {
  const [show, setShow] = useState(true);
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

    setShow(false);

    socket.emit(SocketEvents.JOIN, { name, roomId: room.id }, ({ user, usersInRoom, room }) => {
      console.log('acknowledged from JOIN event', user);
      setUser(user);
      setUsers([...users, ...usersInRoom, user]); // users should be always empty in this case, but w/e
    });
  };

  return (
    <Modal show={show}>
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