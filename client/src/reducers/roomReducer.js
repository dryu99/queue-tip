import socket, { SocketEvents } from '../socket';

/**
 * @typedef Room
 * @param {string} id
 * @param {string} name
 * @param {object[]} users
 * @param {object[]} queue
 */

const initialState = {
  id: null,
  name: null,
  users: [],
  queue: []
};

const roomReducer = (state=initialState, action) => {
  switch(action.type) {
  case 'CREATE_ROOM': {
    return action.data;
  }
  case 'ADD_USER': {
    return {
      ...state,
      users: [...state.users, action.data]
    };
  }
  case 'REMOVE_USER': {
    return {
      ...state,
      users: state.users.filter(u => u.id !== action.data.userId)
    };
  }
  case 'ADD_QUEUE_USER': {
    return {
      ...state,
      queue: [...state.queue, action.data]
    };
  }
  case 'REMOVE_QUEUE_USER': {
    return {
      ...state,
      queue: state.queue.filter(u => u.id !== action.data.userId)
    };
  }
  default: {
    return state;
  }
  }
};

export const createRoom = (roomData) => {
  return {
    type: 'CREATE_ROOM',
    data: roomData
  };
};

export const addUser = (userData) => {
  return {
    type: 'ADD_USER',
    data: userData
  };
};

export const removeUser = (userId) => {
  return  {
    type: 'REMOVE_USER',
    data: { userId }
  };

};

export const addUserToQueue = (userData) => {
  return  {
    type: 'ADD_QUEUE_USER',
    data: userData
  };

};

export const removeUserFromQueue = (userId) => {
  return  {
    type: 'REMOVE_QUEUE_USER',
    data: { userId }
  };

};

export default roomReducer;