import React from 'react';
import socket, { SocketEvents } from '../services/socket';
import logger from '../utils/logger';
import { Button, Card } from './Common';
import styled from 'styled-components';

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

const JoinButton = styled(Button)`
  font-size: 1em;
  padding: 0.75em 1em;
`;

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
            <span className="bold">YOU</span>
          </YOUTextContainer>
          :
          null
      }
      <QueueEmojiSpan
        role="img"
        aria-label="user-avatar"
      >
        {EMOJIS[index]}
      </QueueEmojiSpan>
    </QueueEmojiContainer>
  );
};

const ParticipantRoomView = ({ user, room, queue }) => {

  const joinQueue = (e) => {
    socket.emit(SocketEvents.ENQUEUE, { user, roomId: room.id }, (res) => {
      const { error } = res;
      console.log(res);
      error && logger.error(error);
    });
  };

  const currPosition = queue.findIndex(u => u.id === user.id);

  return (
    <div>
      <QueueInfoContainer>
        <Card>
          <p>Your position in queue</p>
          <h2>{currPosition !== -1 ? currPosition + 1 : 'N/A'}</h2>
        </Card>
        <Card>
          <p>Current queue size</p>
          <h2>{queue.length}</h2>
        </Card>
      </QueueInfoContainer>
      {/* <h3>Queue</h3> */}
      <JoinButton
        disabled={currPosition !== -1}
        onClick={joinQueue}
      >
        Click to join
      </JoinButton>
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