import { useEffect, useState } from "react";
import useGeolocation from "./useGeolocation";
import kakaoLogin from "../assets/kakao_login_large_wide.png";
import logo from "../assets/logo.svg";
import "../css/loginModal.css";
import profileDefault from "../assets/profile_default.jpg";

const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_API_KEY;

function LoginModal({ open, onClose, onLoginSuccess }) {
  const [kakaoUser, setKakaoUser] = useState(null);
  const location = useGeolocation();
  const [region, setRegion] = useState("");
  const [dong, setDong] = useState("");

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

  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = "http://localhost:5173/oauth/callback/kakao";

  const handleKakaoLogin = () => {
    window.location.href =
      `https://kauth.kakao.com/oauth/authorize?` +
      `client_id=${KAKAO_REST_API_KEY}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&response_type=code`;
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

  // 로그인 완료 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 서버에 회원가입/로그인 요청
    onLoginSuccess({
      ...kakaoUser,
      region,
    });
    onClose();
  };
  const kakaoUser1 = {
    nickname: "홍길동",
    profileImg: profileDefault,
    email: "test@test.com",
    region: "서울시 강남구",
  };

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
        <form className="login-modal-content" onSubmit={handleSubmit}>
          <img
            className="profile-img"
            src={kakaoUser1.profileImg}
            alt="프로필"
          />
          <div className="login-field">
            <label className="rg-14">닉네임</label>
            <span className="value rg-14">{kakaoUser1.nickname}</span>
          </div>
          <div className="login-field--input">
            <label className="rg-14">지역 정보 </label>
            <input
              value={dong}
              onChange={(e) => setRegion(e.target.value)}
              required
            />
          </div>
          <button className="signup-btn" type="submit">
            회원가입
          </button>
        </form>
      </div>
      <style>{`
        
      `}</style>
    </div>
  );
}

export default LoginModal;
