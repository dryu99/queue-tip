import React from 'react';
import styled from 'styled-components';
import { Card, CardTitle } from './Common';

const IntroductionContainer = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h4`
  font-size: 1.1em;
  margin: 10px 0;
`;

const StyledP = styled.p`
  margin-top: 0;
`;

const Introduction = () => {
  return (
    <IntroductionContainer>
      <CardTitle>Welcome!</CardTitle>
      <StyledP>
        queue-tip is a simple web app that allows you to facilitate online queues with ease.
      </StyledP>
      <StyledP>
        To get started, just use the form to create a room and send the room link to your participants!
      </StyledP>
      <Header>How does it work?</Header>
      <StyledP>
        As the room creator, you will be able to see everyone in the queue and remove queued users.
        Participants who enter through the link are only able to join the queue and see their current position.
      </StyledP>
      <Header>What&apos;s the admin password used for?</Header>
      <StyledP>
        The admin password can be used by participants to gain the same permissions as the room creator.
        This is useful if you want multiple admins managing a single queue, or if you accidentally disconnect
        and want to join the room again as an admin. Make sure to only share the password with participants
        you trust!
      </StyledP>
    </IntroductionContainer>
  );
};

export default Introduction;