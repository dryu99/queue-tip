import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import socket, { SocketEvents } from '../socket';

const SignInPopup = ({ room, setUser, users, setUsers, setRoomName, setIsRoomValid }) => {
  const [show, setShow] = useState(true);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    socket.emit(SocketEvents.JOIN, { name, roomId: room.id }, ({ user, usersInRoom, room }) => {
      console.log('acknowledged from JOIN event', user);
      setUser(user);
      setUsers([...users, ...usersInRoom, user]); // users should be always empty in this case, but w/e
      // setRoomName(room.name);
    });
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{'Sign In'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
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