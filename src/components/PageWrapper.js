import React from 'react';

const PageWrapper = ({ children }) => {
  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '20px', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      {children}
    </div>
  );
};

export default PageWrapper;
