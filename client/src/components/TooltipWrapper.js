import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const TooltipWrapper = ({ children, placement, text }) => {
  return (
    <OverlayTrigger
      placement={placement}
      overlay={
        <Tooltip>{text}</Tooltip>
      }
    >
      {children}
    </OverlayTrigger>
  );
};

export default TooltipWrapper;