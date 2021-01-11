import React, { useState } from 'react';
import socket, { SocketEvents } from '../socket';
import logger from '../utils/logger';
import { Button, Card } from './Common';
import styled from 'styled-components';

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

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

const AdminRoomView = ({ room, queue, userCount }) => {
// const AdminRoomView = ({ room, userCount }) => {
  // const [queue, setQueue] = useState([
  //   { name: 'bob', id: 1 },
  //   { name: 'john', id: 2 },
  //   { name: 'honey', id: 3 }
  // ]);

  const isQueueEmpty = queue.length === 0;

  const dequeue = () => {
    socket.emit(SocketEvents.DEQUEUE, { roomId: room.id }, (res) => {
      const { error } = res;
      console.log(res);
      error && logger.error(error);
    });
  };

  return (
    <AdminRoomViewContainer>
      <RoomInfoContainer>
        <Card>
          <p>Current user count</p>
          <h2>{userCount}</h2>
        </Card>
        <Card>
          <p>Current queue size</p>
          <h2>{queue.length}</h2>
        </Card>
      </RoomInfoContainer>
      <h3>Queue</h3>
      <Button
        disabled={isQueueEmpty}
        onClick={dequeue}
      >
        Dequeue
      </Button>
      {/* <Button
        onClick={() => setQueue(queue.concat({ name: makeid(Math.random() * 10), id: makeid(Math.random() * 10) }))}>
        TEST ADD
      </Button> */}
      <QueueListContainer>
        {queue.map(u =>
          <div key={u.id}>
            {u.name}
          </div>
        )}
      </QueueListContainer>
    </AdminRoomViewContainer>
  );
};

export default AdminRoomView;