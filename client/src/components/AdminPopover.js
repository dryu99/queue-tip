import React from 'react';
import { ListGroup, Popover } from 'react-bootstrap';

const AdminPopover = (props) => {
  const { makeAdmin, user } = props;

  // these props shouldn't be passed to Popover
  delete props.makeAdmin;
  delete props.user;

  const handleMakeAdminClick = () => {
    console.log('only here');
    makeAdmin(user);
  };

  return (
    <Popover {...props}>
      <Popover.Content>
        <ListGroup variant="flush">
          <ListGroup.Item action onClick={handleMakeAdminClick}>Make Admin</ListGroup.Item>
        </ListGroup>
      </Popover.Content>
    </Popover>
  );
};

export default AdminPopover;