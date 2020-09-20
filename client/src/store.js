import { createStore, combineReducers } from 'redux';

// import blogsReducer from './reducers/blogsReducer';
// import loginReducer from './reducers/loginReducer';
// import usersReducer from './reducers/usersReducer';
// import notificationReducer from './reducers/notificationReducer';


const reducer = combineReducers({
  // blogs: blogsReducer,
  // login: loginReducer,
  // users: usersReducer,
  // notification: notificationReducer
});

const store = createStore(
  reducer,
);

export default store;