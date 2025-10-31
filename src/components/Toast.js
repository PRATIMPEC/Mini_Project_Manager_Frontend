import React from 'react';

const Toast = ({ message, type }) => (
  <div className={`toast ${type}`}>{message}</div>
);

export default Toast;