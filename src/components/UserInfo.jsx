import React, { useEffect, useState } from 'react';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

function UserInfo({ onAddressCheck }) {
  const [user, setUser] = useState({ name: '', profileImage: '' });

  useEffect(() => {
    const token = localStorage.getItem("kakao_token");
    if (!token) {
      console.warn("UserInfo: 토큰 없음");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`${BACKEND_API_URL}/member/me`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("사용자 정보 요청 실패");

        const data = await res.json();
        setUser({
          name: data.nickname || "알 수 없음",
          profileImage: data.profileImageUrl || "",
        });
      } catch (err) {
        console.error("사용자 정보 가져오기 실패:", err);
      }
    };

    const checkAddress = async () => {
      try {
        const res = await fetch(`${BACKEND_API_URL}/member/address/validate`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("주소 유효성 확인 실패");

        const data = await res.json();
        if (!data.hasAddress && onAddressCheck) {
          onAddressCheck(false); // 주소 없음
        }
      } catch (err) {
        console.error("주소 유효성 검사 실패:", err);
      }
    };

    fetchUserInfo();
    checkAddress();
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
