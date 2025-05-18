import React, { useEffect, useState } from 'react';

function UserInfo() {
  const [user, setUser] = useState({ name: '', profileImage: '' });

  useEffect(() => {
    // 백엔드에서 사용자 정보 받아오기 (예시 URL)
    fetch('https://backend.com/api/user/me')
      .then((res) => res.json())
      .then((data) => {
        // 예시: data = { name: '구유경', profileImage: 'https://...' }
        setUser({
          name: data.name,
          profileImage: data.profileImage,
        });
      })
      .catch((err) => {
        console.error('사용자 정보 가져오기 실패:', err);
      });
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#ddd',
          marginRight: '10px',
          overflow: 'hidden',
        }}
      >
        {user.profileImage && (
          <img
            src={user.profileImage}
            alt="사용자 프로필"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
      <span style={{ fontWeight: 'bold' }}>
        {user.name ? `${user.name} 님` : '사용자'}
      </span>
    </div>
  );
}

export default UserInfo;
