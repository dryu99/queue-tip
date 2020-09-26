import React from 'react';

const Error = ({ text }) => {
  return (
    <div className="mt-5">
      <h2 className="text-center">{text}</h2>
    </div>
  );
};

export default Error;