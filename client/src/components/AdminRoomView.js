import React from 'react';
import socket, { SocketEvents } from '../services/socket';
import logger from '../utils/logger';
import { Button, Card } from './Common';
import styled from 'styled-components';
import emojis from '../utils/emojis';

const AdminRoomViewContainer = styled.div`

`;

const RoomInfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const QueueListContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  margin: 1em auto;
  width: 50%;
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

const AdminRoomView = ({ room, queue, userCount }) => {
  const dequeue = () => {
    socket.emit(SocketEvents.DEQUEUE, { roomId: room.id }, (res) => {
      const { error } = res;
      error && logger.error(error);
    });
  };

  const isQueueEmpty = queue.length === 0;

  return (
    <AdminRoomViewContainer>
      <RoomInfoContainer>
        <Card>
          <p>Current room size</p>
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
              <div key={u.id}>
                <span className={i === 0 ? 'underline' : null}>
                  {u.name}
                </span>
                <QueueEmoji role="img" aria-label="user-avatar">
                  {emojis.getUserEmoji(u)}
                </QueueEmoji>
              </div>
            )
            :
            <p>It&apos;s quiet in here...</p>
        }
      </QueueListContainer>
    </AdminRoomViewContainer>
  );
};

export default AdminRoomView;