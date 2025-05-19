import { useEffect, useState } from "react";
import useGeolocation from "./useGeolocation";
import kakaoLogin from "../assets/kakao_login_large_wide.png";
import logo from "../assets/logo.svg";
import "../css/loginModal.css";
import profileDefault from "../assets/profile_default.jpg";

const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_API_KEY;

function LoginModal({ open, onClose, onLoginSuccess }) {
  const location = useGeolocation();
  const [region, setRegion] = useState("");
  const [dong, setDong] = useState("");

  const handleKakaoLogin = () => {
    // 백엔드 로그인 URL로 리다이렉트
    window.location.href = import.meta.env.VITE_BACKEND_LOGIN_API_URL;
  };
  // 위치 정보가 있으면 region에 자동 입력
  useEffect(() => {
    if (location) {
      setRegion(`${location.latitude}, ${location.longitude}`);
      const lat = location.latitude; // 위도
      const lng = location.longitude; // 경도

      fetch(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
        {
          headers: {
            Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`, // 공백 하나로 수정
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.documents && data.documents.length > 0) {
            // 법정동 정보 추출
            const address = data.documents[0].address;
            const dong = address.region_3depth_name; // 예: '명동'
            setDong(dong);
          }
        });
    }
  }, [location]);

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="login-modal">
        <div className="login-modal-content">
          <img className="login-modal-logo" src={logo} alt="로고" />
          <button className="kakao-login-btn" onClick={handleKakaoLogin}>
            <img src={kakaoLogin} alt="카카오 로그인" />
          </button>
        </div>
      </div>
      <style>{`
        
      `}</style>
    </div>
  );
}

export default LoginModal;
