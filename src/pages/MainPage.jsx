import { useAuth } from "../contexts/AuthContext";
import React from "react";
import UserInfo from "../components/UserInfo";
import MapSection from "../components/MapSection";
import CreateButton from "../components/CreateButton";

function MainPage() {
  //테스트 -> 로그인 확인 주석처리
  const { isLoggedIn } = useAuth();
  const token = localStorage.getItem("kakao_token");
  
  return (
    <div>
      <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
        <h2>모임</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {token && <UserInfo />} {/* ✅ 토큰 있을 때만 UserInfo 렌더링 */}
          {isLoggedIn && <CreateButton />}
        </div>
        <MapSection />
      </div>
    </div>
  );
}

export default MainPage;
