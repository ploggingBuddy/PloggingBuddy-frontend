import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import {
  AddressPopupProvider,
  useAddressPopup,
} from "./contexts/AddressPopupContext";
import LoginModal from "./login/LoginModal";
import AddressPopup from "./components/AddressPopup";
import { useAuth } from "./contexts/AuthContext";
import { useState, useEffect } from "react";

import MyPage from "./pages/MyPage";
import MainPage from "./pages/MainPage";
import CreateMeetup from "./pages/CreateMeetup";
import MeetingDetail from "./pages/MeetingDetail";
import OauthCallbackKakao from "./login/OauthCallbackKakao";

// 보호된 라우트 컴포넌트
function ProtectedRoute({ children }) {
  const { isLoggedIn, showLoginModal, setShowLoginModal } = useAuth();

  if (!isLoggedIn) {
    setShowLoginModal(true);
    return null;
  }

  return children;
}

function AppContent() {
  const { showLoginModal, login, setShowLoginModal, isLoggedIn } = useAuth();
  const { showAddressPopup, openAddressPopup, closeAddressPopup } =
    useAddressPopup();
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
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [BACKEND_API_URL, isLoggedIn]);

  // 로그인 상태가 변경되거나 로딩이 완료된 후 주소 팝업 표시
  useEffect(() => {
    if (!loading && isLoggedIn && userData && !userData.address) {
      openAddressPopup();
    }
  }, [loading, isLoggedIn, userData, openAddressPopup]);

  const handleLoginSuccess = (data) => {
    login(data);
    setShowLoginModal(false);
  };

  return (
    <>
      <Header />
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <AddressPopup open={showAddressPopup} onClose={closeAddressPopup} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meeting/:id"
          element={
            <ProtectedRoute>
              <MeetingDetail />
            </ProtectedRoute>
          }
        />
        <Route path="/oauth/callback/kakao" element={<OauthCallbackKakao />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateMeetup />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AddressPopupProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AddressPopupProvider>
    </AuthProvider>
  );
}

export default App;
