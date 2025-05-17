import React from 'react';

function Header() {
  return (
    <header style={{ padding: '20px', borderBottom: '2px solid purple' }}>
      <span style={{ fontWeight: 'bold', fontSize: '24px', color: 'green' }}>Ploop</span>
      <span style={{ marginLeft: '40px', color: 'gray' }}>모임</span>
      <span style={{ marginLeft: '20px', color: 'gray' }}>마이페이지</span>
    </header>
  );
}

export default Header;
