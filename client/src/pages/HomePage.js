import React from 'react';

import CreateRoomForm from '../components/CreateRoomForm';
import styled from 'styled-components';
import Introduction from '../components/Introduction';

const HomePageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  & > div {
    width: 50%;
    min-width: 300px;
  }
`;

const HomePage = () => {
  return (
    <div>
      <HomePageContainer>
        <Introduction />
        <CreateRoomForm />
      </HomePageContainer>
    </div>
  );
};

export default HomePage;