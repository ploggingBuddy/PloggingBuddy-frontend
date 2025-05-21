import React, { useState, useEffect, useCallback } from "react";
import ProfileInfo from "./ProfileInfo";
import MeetingCardList from "../components/MeetingCardList";
import "../css/mypage.css";
import Loading from "../components/Loading";

function ActivityTab({ tab, setTab }) {
  return (
    <div className="activity-tab">
      <button
        className={tab === "profile" ? "active" : ""}
        onClick={() => setTab("profile")}
      >
        <span className="sb-14">개인정보</span>
      </button>
      <button
        className={tab === "activity" ? "active" : ""}
        onClick={() => setTab("activity")}
      >
        <span className="sb-14">활동기록</span>
      </button>
    </div>
  );
}

function MyPage() {
  const [tab, setTab] = useState("profile");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem("kakao_token");
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
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }, [BACKEND_API_URL]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (loading) {
    return (
      <div className="meeting-detail-wrapper">
        <div className="meeting-detail-container">
          <Loading overlay={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="mypage-bg">
      <div className="mypage-container">
        <ActivityTab tab={tab} setTab={setTab} />
        {tab === "profile" ? (
          <ProfileInfo
            nickname={userData?.nickname}
            email={userData?.email}
            address={userData?.detailAddress}
            profileImage={userData?.profileImageUrl}
            onUpdate={fetchUserData}
          />
        ) : (
          <div className="meeting-card-list-container">
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
        )}
      </div>
    </div>
  );
}

export default MyPage;
