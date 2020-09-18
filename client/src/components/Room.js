import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useLocation, useRouteMatch } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Room = () => {
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');
  const ENDPOINT = 'localhost:3003';

  const location = useLocation();
  const match = useRouteMatch('/room/:id');

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    const id = match.params.id;

    socket = io(ENDPOINT);

    setRoomName(name);
    setRoomId(id);

    socket.emit('join', { roomName: name, roomId: id }, () => {

    });

    // on component unmount, disconnect and turn off socket
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search, match.params.id]);

  return (
    <Container>
      <h1>Room: {roomName}</h1>

    </Container>
  );
};

export default Room;