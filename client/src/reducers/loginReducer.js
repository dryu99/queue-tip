import socket, { SocketEvents } from '../socket';

const loginReducer = (state=null, action) => {
  switch(action.type) {
  case 'INIT_USER': {
    return action.data;
  }
  case 'LOGIN_USER': {
    return action.data;
  }
  case 'LOGOUT_USER': {
    return null;
  }
  default: {
    return state;
  }
  }
};

export const initLogin = () => {
  const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
  if (loggedInUserJSON) {
    const user = JSON.parse(loggedInUserJSON);

    // set user token
    // blogService.setToken(user.token);

    return {
      type: 'INIT_USER',
      data: user
    };
  }
};

// loginData.username,
// loginData.userType,
// loginData.roomId,

export const loginUser = (loginData) => {

  socket.emit(SocketEvents.JOIN, loginData, (resData) => {
    const { user, usersInRoom, usersInQueue, error } = resData;
    console.log('acknowledged from JOIN event', user);

    if (!error) {
      dispatch();
    } else {
      console.error(error);
      setUser(user);
      setUsers([...users, ...usersInRoom, user]); // users should be always empty in this case, but w/e
      setQueueUsers([...queueUsers, ...usersInQueue]); // users should be always empty in this case, but w/e


      // save user locally on browser
      // TODO have to make sure admin permissions get saved too i.e. user.type
      localStorage.setItem('queueTipUserData', JSON.stringify(user));
    }
  });

  const user = loginService.login({ username, password });

  // cache user data
  window.localStorage.setItem('loggedInUser', JSON.stringify(user));

  // set user token
  blogService.setToken(user.token);

  dispatch({
    type: 'LOGIN_USER',
    data: user
  });

};