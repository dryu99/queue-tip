import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import socket, { SocketEvents, emitEnqueue, emitDequeue } from '../socket';

import SignIn from './SignIn';
import Queue from './Queue';
import Users from './Users';

const Room = ({ room, user, setUser }) => {
  const [users, setUsers] = useState([]);
  const [queueUsers, setQueueUsers] = useState([]);
  const [inQueue, setInQueue] = useState(false);

  // subscribe to relevant socket events
  useEffect(() => {
    // when another user joins, add them to user list
    socket.on(SocketEvents.NEW_USER_JOIN, ({ newUser }) => {
      console.log('received JOIN event', newUser);
      addNewUser(newUser);
    });

    // when another user leaves, remove them from user list
    socket.on(SocketEvents.LEAVE, ({ leftUser }) => {
      console.log('received LEAVE event', leftUser);
      removeUser(leftUser.id);
      removeQueueUser(leftUser.id);
    });

    // when another user joins queue, add them to queue list
    socket.on(SocketEvents.ENQUEUE, ({ enqueuedUser }) => {
      console.log('received ENQUEUE event', enqueuedUser);
      addNewQueueUser(enqueuedUser);
    });

    // when another user joins queue, add them to queue list
    socket.on(SocketEvents.DEQUEUE, ({ dequeuedUser }) => {
      console.log('received DEQUEUE event', dequeuedUser);
      removeQueueUser(dequeuedUser.id);

      if (dequeuedUser.id === user.id) {
        setInQueue(false);
      }
    });

    // on component unmount, disconnect and turn off socket
    return () => {
      socket.emit(SocketEvents.DISCONNECT, 'testtesttest');
      socket.off();
    };
  }, [users, queueUsers]);

  const addNewUser = (newUser) => {
    setUsers(users.concat(newUser));
  };

  const removeUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const addNewQueueUser = (newQueueUser) => {
    setQueueUsers(queueUsers.concat(newQueueUser));
  };

  const removeQueueUser = (id) => {
    setQueueUsers(queueUsers.filter(u => u.id !== id));
  };


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
      emitDequeue({ userId: user.id, roomId: room.id }, (data) => {
        console.log('acknowledged from DEQUEUE event', data.dequeuedUser);
        removeQueueUser(data.dequeuedUser.id);
        setInQueue(false);
      });
    } else {
      emitEnqueue({ user, roomId: room.id }, (data) => {
        console.log('acknowledged from ENQUEUE event', data.enqueuedUser);
        addNewQueueUser(data.enqueuedUser);
        setInQueue(true);
      });
    }
  };

  // user is considered signed in when name and id exist
  const isUserSignedIn = user && user.name && user.id;

  return (
    <Container className="mt-4">
      {room && isUserSignedIn ?
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
                room={room}
                user={user}
                queueUsers={queueUsers}
                removeQueueUser={removeQueueUser}
                setInQueue={setInQueue}
              />
            </Col>
            <Col xs="3">
              <Users user={user} users={users} />
            </Col>
          </Row>
        </React.Fragment>
        :
        <SignIn
          room={room}
          user={user}
          setUser={setUser}
          addNewUser={addNewUser}
          addNewQueueUser={addNewQueueUser}
        />
      }
      {/* strangely enough, doing this doesn't work for copying to clipboard - setting display to none causes the copied value to be "window.location.href" */}
      {/* <textarea ref={linkRef} style={{ display: 'none' }} value={window.location.href}/> */}
    </Container>
  );
};

export default Room;