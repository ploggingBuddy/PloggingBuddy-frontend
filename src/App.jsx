import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MyPage from "./pages/MyPage";
import MainPage from "./pages/MainPage"; // 메인 페이지 컴포넌트(예시)
import LoginModal from "./login/LoginModal";
import { useState } from "react";
import MeetingDetail from "./pages/MeetingDetail";
import OauthCallbackKakao from "./login/OauthCallbackKakao";

function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Header />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={setUser}
      />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/meeting/:id" element={<MeetingDetail />} />
        <Route path="/kakao" element={<OauthCallbackKakao />} />
        {/* 필요시 다른 라우트도 추가 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
