import LoginModal from "../login/LoginModal";
import { useState } from "react";
import React from "react";
import Header from "../components/Header";
import UserInfo from "../components/UserInfo";
import MapSection from "../components/MapSection";
import CreateButton from "../components/CreateButton";

function MainPage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div>
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={setUser}
      />
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
          <CreateButton />
        </div>
        <MapSection />
      </div>
    </div>
  );
}

export default MainPage;
