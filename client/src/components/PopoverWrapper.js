import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import AdminPopover from './AdminPopover';

const AdminPopoverWrapper = ({ children, ...props }) => {
  return (
    <OverlayTrigger rootClose trigger="click" placement="left" overlay={AdminPopover(props)}>
      {children}
    </OverlayTrigger>
  );
};

export default AdminPopoverWrapper;