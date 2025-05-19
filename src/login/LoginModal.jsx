import { useEffect, useState } from "react";
import useGeolocation from "./useGeolocation";
import kakaoLogin from "../assets/kakao_login_large_wide.png";
import logo from "../assets/logo.svg";
import "../css/loginModal.css";

const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_API_KEY;
const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

function LoginModal({ open, onClose, onLoginSuccess }) {
  const location = useGeolocation();
  const [region, setRegion] = useState("");
  const [dong, setDong] = useState("");

  // 로컬 스토리지에서 토큰 확인
  useEffect(() => {
    const token = localStorage.getItem("kakao_token");
    console.log(token);
    if (token) {
      // 토큰이 있으면 로그인 성공 처리
      onLoginSuccess({ token });
      onClose();
    }
  }, [onLoginSuccess, onClose]);

  // 카카오 SDK 로드
  useEffect(() => {
    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.onload = () => {
        window.Kakao.init(KAKAO_JS_KEY);
      };
      document.body.appendChild(script);
    } else {
      window.Kakao.init(KAKAO_JS_KEY);
    }
  }, []);

  const handleKakaoLogin = () => {
    // 백엔드 로그인 URL로 리다이렉트
    window.location.href = import.meta.env.VITE_BACKEND_LOGIN_API_URL;
  };

  // 위치 정보가 있으면 region에 자동 입력 (reverse geocoding은 실제 서비스에서 필요)
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
