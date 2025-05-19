import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 로컬 스토리지에서 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("kakao_token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setShowLoginModal(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("kakao_token", token);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const logout = () => {
    localStorage.removeItem("kakao_token");
    setIsLoggedIn(false);
    setShowLoginModal(true);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, showLoginModal, setShowLoginModal, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
