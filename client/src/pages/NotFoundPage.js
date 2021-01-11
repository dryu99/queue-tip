import React from 'react';

import styled from 'styled-components';

const NotFoundPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const NotFoundIcon = styled.p`
  margin: 0;
  font-size: 2em;
`;

const NotFoundPage = () => {
  return (
    <NotFoundPageContainer>
      <h1>Page not found!</h1>
      <NotFoundIcon>🙉</NotFoundIcon>
    </NotFoundPageContainer>
  );
};

export default NotFoundPage;