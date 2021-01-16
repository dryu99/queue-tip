import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';
import ParticipantRoomView from './ParticipantRoomView';
import AdminRoomView from './AdminRoomView';
import roomService from '../services/rooms';

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const RoomTitleContainer = styled.div`
  margin: 0 0 0.5em 0;
`;

const RoomTitle = styled.h1`
  margin: 0 0 0.5em 0;
  position: relative;

  & > button {
    position: absolute;
  }
`;

const CopyLinkButton = styled.button`
  padding-left: 5px;
  padding-top: 10px;
  font-size: 0.5em;
  border: none;
  background-color: transparent;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:hover {
    text-shadow: 0 0 1px black;
  }

  &:active {
    text-shadow: 0 0 3px black;
  }
`;

const NameText = styled.p`
  margin: 0 0 0.5em 0;
  font-size: 1.25em;
  position: relative;

  & > button {
    position: absolute;
  }
`;

const MakeAdminButton = styled.button`
  opacity: ${p => p.isAdmin ? '1' : '0.5'};
  padding-left: 5px;
  font-size: 0.7em;
  border: none;
  background-color: transparent;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  ${p =>
    !p.isAdmin &&
  `
    &:hover {
      opacity: 1;
    }

    &:active {
      opacity: 0.75;
    }
  `}
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
  const { user, setUser } = useContext(UserContext);

  const openMakeAdminDialog = () => {
    // we don't disable button when user is admin b/c we don't want < 1 opacity, so we do this check
    if (!user.isAdmin) {
      const adminPassword = prompt('Please enter admin password to gain admin access');

      if (adminPassword === null) return;

      if (adminPassword.length > 0) {
        // make POST request to check for admin password
        roomService.checkAdminPassword(adminPassword, room.id)
          .then(() => {
            setUser({ ...user, isAdmin: true });
          })
          .catch(() => {
            alert('Password is incorrect!');
          });
      } else {
        alert('Password can\'t be empty!');
      }

    }
  };

  return (
    <RoomContainer>
      <RoomTitleContainer>
        <RoomTitle>
          {room.name}
          <CopyLinkButton
            title="Copy room link"
            onClick={copyLinkToClipboard}
          >
            <span role="img" aria-label="link">🔗</span>
          </CopyLinkButton>
        </RoomTitle>
      </RoomTitleContainer>
      <NameText>
        Welcome <span className="bold">{user.name}</span>!
        <MakeAdminButton
          title={user.isAdmin ? 'You\'re an admin!' : 'Become admin'}
          onClick={openMakeAdminDialog}
          isAdmin={user.isAdmin}
        >
          <span role="img" aria-label="crown">👑</span>
        </MakeAdminButton>
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