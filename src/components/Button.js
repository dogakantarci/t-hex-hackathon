import React from 'react';

const Button = ({ children, onClick, type = 'button', style }) => (
  <button onClick={onClick} type={type} style={{ marginTop: '10px', ...style }}>
    {children}
  </button>
);

export default Button;
