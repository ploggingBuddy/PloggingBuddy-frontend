import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import UserInfo from "../components/UserInfo";
import MapSection from "../components/MapSection";
import CreateButton from "../components/CreateButton";
import Loading from "../components/Loading";

function MainPage() {
  const { isLoggedIn } = useAuth();
  const token = localStorage.getItem("kakao_token");

  const [showAddressPrompt, setShowAddressPrompt] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddressCheck = (hasAddress) => {
    if (!hasAddress) {
      setShowAddressPrompt(true);
    }
    setLoading(false); // 사용자 정보 확인 완료 시 로딩 종료
  };

  const handleMapLoaded = () => {
    setLoading(false); // 지도까지 로딩 완료 시 로딩 종료
  };

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true); // 로그인된 이후에만 로딩 시작
    }
  }, [isLoggedIn]);

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
    <div>
      {showAddressPrompt && (
        <div
          style={{
            backgroundColor: "#000000a0",
            color: "#fff",
            padding: "20px",
            textAlign: "center",
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 9999,
          }}
        >
          🚨 주소 정보가 없습니다. [프로필 → 주소 등록]을 먼저 완료해주세요.
        </div>
      )}
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
          {token && <UserInfo onAddressCheck={handleAddressCheck} />}
          {isLoggedIn && <CreateButton />}
        </div>
        <MapSection onMapLoaded={handleMapLoaded} />
      </div>
    </div>
  );
}

export default MainPage;
