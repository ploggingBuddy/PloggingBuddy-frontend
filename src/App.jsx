import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import LoginModal from "./login/LoginModal";
import { useAuth } from "./contexts/AuthContext";

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
  const { showLoginModal, login, setShowLoginModal } = useAuth();

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
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
