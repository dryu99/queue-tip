import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';
import ParticipantRoomView from './ParticipantRoomView';
import AdminRoomView from './AdminRoomView';

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const RoomTitle = styled.h1`
  margin: 0 0 0.5em 0;
`;

const CopyLinkButton = styled.button`
  padding: 0 0 0 5px;
  border: none;
  font-size: 0.75em;
  background-color: transparent;

  &:hover {
    text-shadow: 0 0 1px black;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:active {
    text-shadow: 0 0 3px black;
  }
`;

const NameText = styled.p`
  margin: 0 0 0.5em 0;
  font-size: 1.25em;
`;

const copyLinkToClipboard = () => {
  let tempTextArea = document.createElement('textarea');
  document.body.appendChild(tempTextArea);
  tempTextArea.value = window.location.href;
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);
};

const Room = ({ room, queue, userCount }) => {
  const { user } = useContext(UserContext);

  return (
    <RoomContainer>
      <RoomTitle>
        {room.name}
        <CopyLinkButton
          title="copy link"
          onClick={copyLinkToClipboard}
        >
          <span role="img" aria-label="link">🔗</span>
        </CopyLinkButton>
      </RoomTitle>
      <NameText>
        Welcome <span className="bold">{user.name}</span>!
      </NameText>
      {
        user.isAdmin ?
          <AdminRoomView
            room={room}
            queue={queue}
            userCount={userCount}
          />
          :
          <ParticipantRoomView
            room={room}
            user={user}
            queue={queue}
          />
      }
    </RoomContainer>
  );
};

export default Room;