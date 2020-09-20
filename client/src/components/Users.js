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
          const isUserCurrent = user.name === u.name;

          const listItemProps = {
            variant: isUserCurrent ? 'secondary' : null,
            action: isUserCurrent ? true : false,
          };

          const listItem = (
            <ListGroup.Item key={u.id} {...listItemProps}>
              <User user={u}/>
            </ListGroup.Item>
          );

          return (
            isUserCurrent ?
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