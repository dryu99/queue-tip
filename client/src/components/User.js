import React from 'react';
import { UserTypes } from '../types';

const User = ({ user }) => {
  // const isAdmin = user.type === UserTypes.ADMIN;
  // const colourClass = isAdmin
  //   ? 'text-danger'
  //   : isCurrentUser
  //     ? 'text-primary'
  //     : '';

  return (
    <span>
      {user.name}
    </span>
  );
};

export default User;