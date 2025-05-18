import React from 'react';

function UserInfo() {
  // 나중에 백에서 받아올 수 있도록 props 처리 or useEffect fetch 가능
  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#ddd',
          marginRight: '10px',
        }}
      ></div>
      <span style={{ fontWeight: 'bold' }}>구유경 님</span> {/* 나중에 동적 처리 */}
    </div>
  );
}

export default UserInfo;
