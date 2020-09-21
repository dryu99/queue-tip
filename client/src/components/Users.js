import React from 'react';
import { ListGroup } from 'react-bootstrap';
import User from './User';
import TooltipWrapper from './TooltipWrapper';

const Users = ({ user, users }) => {

  return (
    <div>
      <h4>Users: {users.length}</h4>
      <ListGroup>
        {users.map(u => {
          const isCurrentUser = user.name === u.name;

          const listItemProps = {
            // variant: isCurrentUser ? 'secondary' : null,
            action: isCurrentUser ? true : false,
          };

          const listItem = (
            <ListGroup.Item key={u.id} {...listItemProps}>
              <User user={u} isCurrentUser={isCurrentUser}/>
            </ListGroup.Item>
          );

          return (
            isCurrentUser ?
              <TooltipWrapper
                key={u.id}
                placement="left"
                text="You!">
                {listItem}
              </TooltipWrapper>
              :
              listItem
          );
        })}
      </ListGroup>
    </div>
  );
};

export default Users;