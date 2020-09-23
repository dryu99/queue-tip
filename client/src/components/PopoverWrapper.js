import React from 'react';
import { ListGroup, Popover, OverlayTrigger } from 'react-bootstrap';
import AdminPopover from './AdminPopover';

// const popover = (
//   <Popover id="popover-basic">
//     <Popover.Content>
//       <ListGroup variant="flush">
//         <ListGroup.Item action onClick={() => console.log('a')}>Make Admin</ListGroup.Item>
//       </ListGroup>
//     </Popover.Content>
//   </Popover>
// );

const AdminPopoverWrapper = ({ children, ...props }) => {
  return (
    <OverlayTrigger rootClose trigger="click" placement="left" overlay={AdminPopover(props)}>
      {children}
    </OverlayTrigger>
  );
};

export default AdminPopoverWrapper;