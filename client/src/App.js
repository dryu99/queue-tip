import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';

import Home from './components/Home';
import Room from './components/Room';
import Error from './components/Error';
import NavHeader from './components/NavHeader';

import { emitCheckRoom } from './socket';
import logger from './utils/logger';
import ThemeProvider from './styles/ThemeProvider';
import GlobalStyle from './styles/GlobalStyle';
import styled from 'styled-components';
import { NotificationProvider } from './context/NotificationContext';
import Notification from './components/Notification';
import { RoomProvider } from './context/RoomContext';
import { UserProvider } from './context/UserContext';
import RoomPage from './pages/RoomPage';

// function App() {
//   const [room, setRoom] = useState(null);
//   const [queuedUsers, setQueuedUsers] = useState([]);
//   const [roomError, setRoomError] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);

//   const match = useRouteMatch('/room/:id');

//   /**
//    * If user entered via link:
//    *   1) check to see if specified room id exists, if so init room and queue.
//    *   2) if room exists, check local storage for cached user data and try to join room
//    */
//   useEffect(() => {
//     if (match && !room) {
//       logger.info('emitting room check event');

//       // check to see if room exists on server, if so set room and queued users on client
//       emitCheckRoom(match.params.id, (resData) => {
//         logger.info('acknowledged from CHECK ROOM event', resData);
//         const { room, queuedUsers, error } = resData;

//         if (room && !error) {
//           setRoom(room);
//           setQueuedUsers(queuedUsers);
//         } else {
//           logger.error(error);
//           setRoomError('sorry room doesn\'t exist...');
//         }
//       });
//     }
//   }, [match, room]);

//   return (
//     <>
//       <NavHeader />
//       <Switch className="mt-4">
//         <Route path="/room/:id">
//           {roomError ?
//             <Error text={roomError}/>
//             : room ?
//               <Room
//                 room={room}
//                 queuedUsers={queuedUsers}
//                 setQueuedUsers={setQueuedUsers}
//                 isAdmin={isAdmin}
//                 setIsAdmin={setIsAdmin}
//               />
//               : // room is loading
//               <div className="my-5 text-center">
//                 <Spinner className="my-5" animation="border" role="status">
//                   <span className="sr-only">Loading...</span>
//                 </Spinner>
//               </div>
//           }
//         </Route>
//         <Route exact path="/">
//           <Home
//             setIsAdmin={setIsAdmin}
//             setRoom={setRoom}
//             setRoomError={setRoomError}
//           />
//         </Route>
//         <Route>
//           <Error text="404 resource not found"/>
//         </Route>
//       </Switch>
//     </>
//   );
// }

const Content = styled.div`
  padding: 2em 7.5em;
`;

const App = () => {
  console.log('app render');
  return (
    <ThemeProvider>
      <GlobalStyle />
      <NotificationProvider>
        <Notification />
        <UserProvider>
          <RoomProvider>
            <Content>
              <h1><a href="/">queue-tip</a></h1>
              <Switch>
                <Route path="/room/:id">
                  <RoomPage />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route>
                  {/* <Error text="404 resource not found"/> */}
                </Route>
              </Switch>
            </Content>
          </RoomProvider>
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );

};

export default App;
