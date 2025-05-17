import { useEffect, useState } from "react";
import useGeolocation from "../useGeolocation";
import kakaoLogin from "../assets/kakao_login_large_wide.png";
import logo from "../assets/logo.svg";
import "../css/loginModal.css";

const KAKAO_JS_KEY = "1e7281e3573df762c1adf01537b45653";

function LoginModal({ open, onClose, onLoginSuccess }) {
  const [kakaoUser, setKakaoUser] = useState(null);
  const location = useGeolocation();
  const [region, setRegion] = useState("");

  // 카카오 SDK 로드
  useEffect(() => {
    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "";
      script.onload = () => {
        window.Kakao.init(KAKAO_JS_KEY);
      };
      document.body.appendChild(script);
    } else {
      window.Kakao.init(KAKAO_JS_KEY);
    }
  }, []);

  // 카카오 로그인
  const handleKakaoLogin = () => {
    if (!window.Kakao) return;
    window.Kakao.Auth.login({
      scope: "profile_nickname,profile_image",
      success: function (authObj) {
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            setKakaoUser({
              nickname: res.kakao_account.profile.nickname,
              profileImg: res.kakao_account.profile.profile_image_url,
            });
          },
          fail: function (error) {
            alert("카카오 사용자 정보 요청 실패: " + JSON.stringify(error));
          },
        });
      },
      fail: function (err) {
        alert("카카오 로그인 실패: " + JSON.stringify(err));
      },
    });
  };

  // 위치 정보가 있으면 region에 자동 입력 (reverse geocoding은 실제 서비스에서 필요)
  useEffect(() => {
    if (location) {
      setRegion(`${location.latitude}, ${location.longitude}`);
      // 실제 서비스에서는 좌표 → 주소 변환 API 필요
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

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="login-modal">
        {!kakaoUser ? (
          <div className="login-modal-content">
            <img className="login-modal-logo" src={logo} alt="로고" />
            <button className="kakao-login-btn" onClick={handleKakaoLogin}>
              <img src={kakaoLogin} alt="카카오 로그인" />
            </button>
          </div>
        ) : (
          <form className="login-modal-content" onSubmit={handleSubmit}>
            <img
              src={kakaoUser.profileImg}
              alt="프로필"
              style={{ width: 80, borderRadius: "50%" }}
            />
            <div>이름: {kakaoUser.nickname}</div>
            <div>이메일: {kakaoUser.email}</div>
            <div>
              <label>지역(내 위치): </label>
              <input
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
              />
              <span style={{ fontSize: 12, color: "#888" }}>
                (브라우저 위치로 자동 입력됨, 필요시 수정)
              </span>
            </div>
            <button type="submit">로그인 완료</button>
          </form>
        )}
      </div>
      <style>{`
        
      `}</style>
    </div>
  );
}

export default LoginModal;
