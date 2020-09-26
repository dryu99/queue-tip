import React from 'react';
import TooltipWrapper from './TooltipWrapper';

import copyLinkIcon from '../assets/copy-link.png';

const RoomName = ({ room }) => {

  const copyLinkToClipboard = () => {
    // TODO manipulating DOM here directly feels sketchy, doing it the react way doesn't work see comments below
    var dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  };

  return (
    <div>
      <h1 className="d-inline-block">{room.name}</h1>
      <TooltipWrapper text="copy url">
        <img
          id="copy-link-icon"
          className="align-baseline mx-2"
          src={copyLinkIcon}
          alt="copy-link-icon"
          onClick={copyLinkToClipboard}
        />
      </TooltipWrapper>
    </div>
  );
};

export default RoomName;