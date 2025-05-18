import LoginModal from "../login/LoginModal";
import { useState } from "react";

function MainPage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div>
      <button onClick={() => setLoginOpen(true)}>로그인</button>
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={setUser}
      />
      {user && (
        <div>
          <h3>로그인 완료!</h3>
          <div>
            {user.nickname} ({user.email})
          </div>
          <div>지역: {user.region}</div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
