import React from 'react';
import { UserTypes } from '../enums';

const User = ({ user, isCurrentUser }) => {
  const isAdmin = user.type === UserTypes.ADMIN;
  const colourClass = isAdmin
    ? 'text-danger'
    : isCurrentUser
      ? 'text-primary'
      : '';

  return (
    <span className={colourClass}>
      {user.name} {isAdmin ? '(admin)' : ''}
    </span>
  );
};

export default User;