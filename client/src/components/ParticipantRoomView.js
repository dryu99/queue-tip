import React from 'react';
import socket, { SocketEvents } from '../services/socket';
import logger from '../utils/logger';
import { Button, Card } from './Common';
import styled from 'styled-components';
import emojis from '../utils/emojis';

const QueueInfoContainer = styled.div`
  display: flex;
  justify-content: center;

  & > div {
    width: 50%;
  }
`;

const EmojisContainer = styled(Card)`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-end;
  padding-top: 1.5em;
`;

const QueueUserContainer = styled.div`
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

const QueueEmoji = styled.span`
  font-size: 3em;
  margin: 3px 3px 10px 3px;
`;

const DoorEmoji = styled.span`
  font-size: 3em;
  margin: ${p => p.isQueueEmpty ? '3px 3px 10px 3px' : '3px 30px 10px 3px'}
`;

const JoinButton = styled(Button)`
  font-size: 1em;
  padding: 0.75em 1em;
`;

const EmptyQueueText = styled.p`
  margin: auto;
  padding-right: 2.5em;
  text-align: center;
`;

// each user gets an emoji avatar based on the first char in their name
const QueueUser = ({ user, currentUser }) => {
  const emoji = emojis.getUserEmoji(user);

  return (
    <QueueUserContainer>
      {
        user.id === currentUser.id ?
          <YOUTextContainer>
            <span className="bold">YOU</span>
          </YOUTextContainer>
          :
          null
      }
      <QueueEmoji
        role="img"
        aria-label="user-avatar"
      >
        {emoji}
      </QueueEmoji>
    </QueueUserContainer>
  );
};

const ParticipantRoomView = ({ user, room, queue }) => {

  const joinQueue = () => {
    socket.emit(SocketEvents.ENQUEUE, { user, roomId: room.id }, (res) => {
      const { error } = res;
      error && logger.error(error);
      alert('Something went wrong on server!');
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
      <JoinButton
        disabled={currPosition !== -1}
        onClick={joinQueue}
      >
        Join queue
      </JoinButton>
      <EmojisContainer>
        <DoorEmoji
          role="img"
          aria-label="door"
          isQueueEmpty={queue.length === 0}
        >
          🚪
        </DoorEmoji>
        {
          queue.length > 0 ?
            queue.map(u =>
              <QueueUser
                key={u.id}
                user={u}
                currentUser={user}
              />
            )
            :
            <EmptyQueueText>It&apos;s quiet in here...</EmptyQueueText>
        }
      </EmojisContainer>
    </div>
  );
};

export default ParticipantRoomView;