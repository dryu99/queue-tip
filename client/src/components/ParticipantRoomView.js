import React, { useState, useEffect, useContext } from 'react';
import socket, { SocketEvents } from '../socket';
import logger from '../utils/logger';
import { Button, Card } from './Common';
import styled from 'styled-components';
import { RoomContext } from '../context/RoomContext';

const EMOJIS = [
  '🐢','🐍','🦖','🐡','🐠','🐬','🐳','🐅',
  '🦓','🦍','🐘','🦏','🐫','🦒','🐂','🐄','🐎',
  '🐖','🐑','🐐','🦌','🐕','🐈','🐓','🦃','🐇',
  '🐀','🐿','🦔','🐉','🦆','🦅','🦇','🐝','🐛',
  '🐜','🌛','🗿','🐒'
];

const QueueInfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const EmojisContainer = styled(Card)`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-end;
  padding-top: 1.5em;
`;

const QueueEmojiContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const YOUTextContainer = styled.span`
  position: relative;

  & > span {
    position: absolute;
    top: -10px;
    right: 10px;
    font-weight: bold;
  }
`;

const QueueEmojiSpan = styled.span`
  font-size: 3em;
  margin: 3px 3px 10px 3px;
`;

const DoorEmojiSpan = styled.span`
  font-size: 3em;
  margin: ${p => p.isQueueEmpty ? '3px 3px 10px 3px' : '3px 30px 10px 3px'}
`;

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// each user gets an emoji avatar based on the first char in their name
const QueueEmoji = ({ user, currentUser }) => {
  const firstCharCode = user.name.charCodeAt(0);
  const index = !isNaN(firstCharCode)
    ? firstCharCode % EMOJIS.length
    : Math.floor(Math.random() * EMOJIS.length);

  return (
    <QueueEmojiContainer>
      {
        user.id === currentUser.id ?
          <YOUTextContainer>
            <span>YOU</span>
          </YOUTextContainer>
          :
          null
      }
      <QueueEmojiSpan>
        {EMOJIS[index]}
      </QueueEmojiSpan>
    </QueueEmojiContainer>
  );
};

const ParticipantRoomView = ({ user, room, queue }) => {
  const { setQueue } = useContext(RoomContext); // TODO delete after done testing

  const joinQueue = (e) => {
    socket.emit(SocketEvents.ENQUEUE, { user, roomId: room.id }, (res) => {
      const { error } = res;
      console.log(res);
      error && logger.error(error);
    });
    // setQueue(queue.concat({ name: makeid(3) }));
  };

  // TODO this is a bottleneck
  const currPosition = queue.findIndex(u => u.id === user.id);

  return (
    <div>
      <QueueInfoContainer>
        <Card>
          <p>Your current position</p>
          <h2>{currPosition !== -1 ? currPosition + 1 : 'N/A'}</h2>
        </Card>
        <Card>
          <p>Current queue size</p>
          <h2>{queue.length}</h2>
        </Card>
      </QueueInfoContainer>
      <h3>Queue</h3>
      <Button
        disabled={currPosition !== -1}
        onClick={joinQueue}
      >
        Join
      </Button>
      <EmojisContainer>
        <DoorEmojiSpan isQueueEmpty={queue.length === 0}>🚪</DoorEmojiSpan>
        {
          queue.map(u =>
            <QueueEmoji
              key={u.id}
              user={u}
              currentUser={user}
            />
          )
        }
      </EmojisContainer>
    </div>
  );
};

export default ParticipantRoomView;