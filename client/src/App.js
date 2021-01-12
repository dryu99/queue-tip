import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import ThemeProvider from './styles/ThemeProvider';
import GlobalStyle from './styles/GlobalStyle';
import styled from 'styled-components';
import { RoomProvider } from './context/RoomContext';
import { UserProvider } from './context/UserContext';
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import NotFoundPage from './pages/NotFoundPage';
import Brand from './components/Brand';

const Content = styled.div`
  padding: 2em 7.5em;
`;

const Title = styled.h3`
  text-align: center;
  & > a {
    color: black;
  }
`;

const App = () => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <UserProvider>
        <RoomProvider>
          <Content>
            <Brand />
            <Title><a href="/">queue-tip</a></Title>
            <Switch>
              <Route path="/room/:id">
                <RoomPage />
              </Route>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
          </Content>
        </RoomProvider>
      </UserProvider>
    </ThemeProvider>
  );

};

export default App;
