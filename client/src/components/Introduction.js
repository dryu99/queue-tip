import React from 'react';
import styled from 'styled-components';
import { Card, CardTitle } from './Common';

const IntroductionContainer = styled(Card)`
  display: flex;
  flex-direction: column;
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
      <StyledP>
        As the room creator, you will be able to see everyone in the queue and remove queued users.
        Participants who enter through the link are only able to join the queue and see their current positions.
      </StyledP>

    </IntroductionContainer>
  );
};

export default Introduction;