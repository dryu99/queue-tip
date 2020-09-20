import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import socket, { SocketEvents } from '../socket';

import SignInPopup from './SignInPopup';
import SignInForm from './SignInForm';
import Queue from './Queue';
import Users from './Users';

const Room = ({ room, isAdmin, user, setUser }) => {
  const [users, setUsers] = useState([]);
  const [queueUsers, setQueueUsers] = useState([]);
  const [inQueue, setInQueue] = useState(false);

  // subscribe to relevant socket events
  useEffect(() => {
    if (room) {
      // when another user joins, add them to user list
      socket.on(SocketEvents.NEW_USER_JOIN, ({ newUser }) => {
        console.log('received JOIN event', newUser);
        setUsers([...users, newUser]);
      });

      // when another user leaves, remove them from user list
      socket.on(SocketEvents.LEAVE, ({ leftUser }) => {
        console.log('received LEAVE event', leftUser);
        setUsers(users.filter(u => u.id !== leftUser.id));
        setQueueUsers(queueUsers.filter(qu => qu.id !== leftUser.id));
      });

      // when another user joins queue, add them to queue list
      socket.on(SocketEvents.ENQUEUE, ({ newQueueUser }) => {
        console.log('received ENQUEUE event', newQueueUser);
        setQueueUsers([...queueUsers, newQueueUser]);
      });

      // when another user joins queue, add them to queue list
      socket.on(SocketEvents.DEQUEUE, ({ dequeuedUser }) => {
        console.log('received DEQUEUE event', dequeuedUser);
        setQueueUsers(queueUsers.filter(qu => qu.id !== dequeuedUser.id));
      });
    }

    // on component unmount, disconnect and turn off socket
    return () => {
      socket.emit(SocketEvents.DISCONNECT);
      socket.off();
    };
  }, [users, queueUsers, room]);

  const copyLinkToClipboard = (e) => {
    // TODO manipulating DOM here directly feels sketchy, doing it the react way doesn't work see comments below
    var dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  };

  const handleQueueToggle = (e) => {
    if (inQueue) {
      socket.emit(SocketEvents.DEQUEUE, { roomId: room.id }, ({ dequeuedUser }) => {
        console.log('acknowledged from DEQUEUE event', dequeuedUser);
        setQueueUsers(queueUsers.filter(qu => qu.id !== dequeuedUser.id));
        setInQueue(false);
      });
    } else {
      socket.emit(SocketEvents.ENQUEUE, { user, roomId: room.id }, (data) => {
        console.log('acknowledged from ENQUEUE event', data.user);
        setQueueUsers([...queueUsers, data.user]);
        setInQueue(true);
      });
    }
  };

  return (
    <Container className="mt-4">
      {room && user ?
        <React.Fragment>
          <Row>
            <Col>
              <h1>{room.name}</h1>
            </Col>
            <Col xs="auto">
              <Button onClick={copyLinkToClipboard} size="lg" variant="secondary">
                Copy Link
              </Button>
            </Col>
            <Col xs="2">
              <Button onClick={handleQueueToggle} size="lg" block>
                {inQueue ? 'Leave Queue' : 'Join Queue'}
              </Button>
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col>
              <Queue
                user={user}
                isAdmin={isAdmin}
                queueUsers={queueUsers}
                setQueueUsers={setQueueUsers}
              />
            </Col>
            <Col xs="3">
              <Users user={user} users={users} />
            </Col>
          </Row>
        </React.Fragment>
        :
        room ?
          <SignInForm
            room={room}
            setUser={setUser}
            users={users}
            setUsers={setUsers}
            queueUsers={queueUsers}
            setQueueUsers={setQueueUsers}
          />
          :
          <span>Sorry room doesn't exist...</span>
      }
      {/* strangely enough, doing this doesn't work for copying to clipboard - setting display to none causes the copied value to be "window.location.href" */}
      {/* <textarea ref={linkRef} style={{ display: 'none' }} value={window.location.href}/> */}
    </Container>
  );
};

export default Room;