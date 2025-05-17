import React, { useState } from "react";
import Header from "./components/Header";
import ProfileInfo from "./ProfileInfo";
import MeetingCardList from "./components/MeetingCardList";
import "./css/mypage.css";

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
  const [tab, setTab] = useState("profile"); // 'profile' or 'activity'

  // TODO: 로그인 유저 정보, 모임 정보 등은 useEffect에서 API로 받아와서 하위 컴포넌트에 props로 전달

  return (
    <div className="mypage-bg">
      <div className="mypage-container">
        <ActivityTab tab={tab} setTab={setTab} />
        {tab === "profile" ? (
          <ProfileInfo />
        ) : (
          <div className="meeting-card-list-container">
            <MeetingCardList title="참여 예정 모임" />
            <MeetingCardList title="참여했던 모임" />
            <MeetingCardList title="내가 생성했던 모임" />
          </div>
        )}
      </div>
    </div>
  );
}
export default MyPage;
