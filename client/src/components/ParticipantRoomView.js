import React, { useState, useEffect, useContext } from 'react';
import socket, { SocketEvents } from '../socket';
import logger from '../utils/logger';
import { Button } from './Common';
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

const EmojisContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-end;
`;

const UserEmojiContainer = styled.div`
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

const QueueEmoji = styled.span`
  font-size: 3em;
  margin: 3px 3px 10px 3px;
`;

const DoorEmoji = styled.span`
  font-size: 3em;
  margin: ${p => p.isQueueEmpty ? '3px 3px 10px 3px' : '3px 30px 10px 3px'}
`;

const StyledButton = styled(Button)`
  margin-bottom: 2em;
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

const ParticipantRoomView = ({ user, room, queue, setQueue }) => {

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
        <div>
          <p>Your current position</p>
          <h2>{currPosition !== -1 ? currPosition + 1 : 'N/A'}</h2>
        </div>
        <div>
          <p>Current queue size</p>
          <h2>{queue.length}</h2>
        </div>
      </QueueInfoContainer>
      <StyledButton
        disabled={currPosition !== -1}
        onClick={joinQueue}>
        Join Queue
      </StyledButton>
      <EmojisContainer>
        <DoorEmoji isQueueEmpty={queue.length === 0}>🚪</DoorEmoji>
        {
          // each user gets an emoji avatar based on the first char in their name
          queue.map(u => {
            const firstCharCode = u.name.charCodeAt(0);
            const index = !isNaN(firstCharCode)
              ? firstCharCode % EMOJIS.length
              : Math.floor(Math.random() * EMOJIS.length);

            return u.id === user.id ? (
              <UserEmojiContainer key={u.id}>
                <YOUTextContainer>
                  <span>YOU</span>
                </YOUTextContainer>
                <QueueEmoji>
                  {EMOJIS[index]}
                </QueueEmoji>
              </UserEmojiContainer>
            ) : (
              <QueueEmoji>
                {EMOJIS[index]}
              </QueueEmoji>
            );
          })
        }
      </EmojisContainer>
    </div>
  );
};

export default ParticipantRoomView;