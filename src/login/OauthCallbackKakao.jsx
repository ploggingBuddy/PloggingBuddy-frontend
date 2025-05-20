import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OauthCallbackKakao() {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. URL에서 token 파싱
    const params = new URL(window.location.href).searchParams;
    console.log(params);
    const token = params.get("code");

    if (token) {
      // 2. localStorage에 저장
      localStorage.setItem("kakao_token", token); // ✅ 문자열로 변환해서 저장
      // 3. 홈으로 리다이렉트
      // navigate("/");
    } else {
      // 토큰이 없을 때 예외 처리(에러 페이지 등)
      alert("로그인 토큰이 없습니다.");
      navigate("/");
    }
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
}

export default OauthCallbackKakao;
