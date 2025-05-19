import { useAuth } from "../contexts/AuthContext";
import React from "react";
import UserInfo from "../components/UserInfo";
import MapSection from "../components/MapSection";
import CreateButton from "../components/CreateButton";

function MainPage() {
  const { isLoggedIn } = useAuth();

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
          <UserInfo />
          {isLoggedIn && <CreateButton />}
        </div>
        <MapSection />
      </div>
    </div>
  );
}

export default MainPage;
