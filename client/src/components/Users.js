import React from 'react';
import { ListGroup } from 'react-bootstrap';
import User from './User';
import PopoverWrapper from './PopoverWrapper';
import { UserTypes } from '../types';

const Users = ({ user, users, makeAdmin }) => {
  return (
    <div>
      <h4>Users: {users.length}</h4>
      <ListGroup>
        {users.map(u => {
          const isCurrentUser = user.name === u.name;
          const isAdmin = user.type === UserTypes.ADMIN;

          const listItemProps = {
            action: isAdmin ? true : false,
          };

          const listItem = (
            <ListGroup.Item key={u.id} {...listItemProps}>
              <User user={u} isCurrentUser={isCurrentUser}/>
            </ListGroup.Item>
          );

          return (
            isAdmin ?
              <PopoverWrapper key={u.id} makeAdmin={makeAdmin} user={u}>
                {listItem}
              </PopoverWrapper>
              :
              listItem
          );
        })}
      </ListGroup>
    </div>
  );
};

export default Users;