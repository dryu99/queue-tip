import React from 'react';
import socket, { SocketEvents } from '../services/socket';
import logger from '../utils/logger';
import { Button, Card } from './Common';
import styled from 'styled-components';
import emojis from '../utils/emojis';

const RoomInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    // width: 50%;
    width: 150px;
  }
`;

const QueueListContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  margin: 1em auto;
  width: 240px;
  height: 400px;
  padding: 1em;
  overflow: auto;

  & > div {
    margin-bottom: 0.5em;
  }
`;

const DequeueButton = styled(Button)`
  font-size: 1em;
  padding: 0.75em 1em;
`;

const QueueEmoji = styled.span`
  padding-left: 3px;
`;

const EmptyQueueTextContainer = styled.div` 
  & > p {
    margin-top: 10px;
  }
`;

const QueueUser = ({ user, i }) => {
  return (
    <div key={user.id}>
      <span className={i === 0 ? 'underline' : null}>
        {user.name}
      </span>
      <QueueEmoji role="img" aria-label="user-avatar">
        {emojis.getUserEmoji(user)}
      </QueueEmoji>
    </div>
  );
};

const AdminRoomView = ({ room, queue, userCount }) => {

  const dequeue = () => {
    socket.emit(SocketEvents.DEQUEUE, { roomId: room.id }, (res) => {
      const { error } = res;
      error && logger.error(error);
      alert('Something went wrong on server!');
    });
  };

  const isQueueEmpty = queue.length === 0;

  return (
    <div>
      <RoomInfoContainer>
        <Card>
          <p># of users in room</p>
          <h2>{userCount}</h2>
        </Card>
        <Card>
          <p>Current queue size</p>
          <h2>{queue.length}</h2>
        </Card>
      </RoomInfoContainer>
      <DequeueButton
        disabled={isQueueEmpty}
        onClick={dequeue}
      >
        Dequeue
      </DequeueButton>
      <QueueListContainer>
        {
          queue.length > 0 ?
            queue.map((u, i) =>
              <QueueUser key={u.id} user={u} i={i} />
            )
            :
            <EmptyQueueTextContainer>
              <p>It&apos;s quiet in here...</p>
              <p>Click the 🔗 icon above to copy the room link and share it!</p>
            </EmptyQueueTextContainer>
        }
      </QueueListContainer>
    </div>
  );
};

export default AdminRoomView;