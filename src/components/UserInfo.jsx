import React, { useEffect, useState } from 'react';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

function UserInfo() {
  const [user, setUser] = useState({ name: '', profileImage: '' });

  useEffect(() => {
  const token = localStorage.getItem("kakao_token");
  console.log("UserInfo token:", token); // ✅ 확인

  if (!token) {
    console.warn("UserInfo: 토큰 없음");
    return;
  }

  const fetchUserInfo = async () => {
    try {
      console.log("요청 시작:", `${BACKEND_API_URL}/member/me`);
      const res = await fetch(`${BACKEND_API_URL}/member/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("사용자 정보 요청 실패");

      const data = await res.json();
      console.log("받은 데이터:", data);

      setUser({
        name: data.nickname || "알 수 없음",
        profileImage: data.profileImageUrl || "",
      });
    } catch (err) {
      console.error("UserInfo에서 사용자 정보 가져오기 실패:", err);
    }
  };

  fetchUserInfo();
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
