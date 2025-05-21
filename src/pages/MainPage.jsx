import React, { useState, useEffect } from "react";
import MeetingCardList from "../components/MeetingCardList";
import "../css/mainpage.css";

function MainPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("kakao_token");
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_API_URL}/member/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("유저 정보 불러오기 실패");
        const data = await res.json();
        setUserData(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [BACKEND_API_URL]);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="mainpage-bg">
      <div className="mainpage-container">
        <MeetingCardList
          title="참여 예정 모임"
          meetings={userData?.pendingPosts || []}
        />
        <MeetingCardList
          title="참여했던 모임"
          meetings={userData?.participatedPosts || []}
        />
        <MeetingCardList
          title="내가 생성했던 모임"
          meetings={userData?.createdPosts || []}
        />
      </div>
    </div>
  );
}

export default MainPage;
