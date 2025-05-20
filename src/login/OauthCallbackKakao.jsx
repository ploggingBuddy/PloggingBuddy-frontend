import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OauthCallbackKakao() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const token = params.get("token"); // ✅ 'code'가 아니라 'token'

    if (token) {
      localStorage.setItem("kakao_token", token);

      // 사용자 정보 요청해서 user 저장
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/member/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem("user", JSON.stringify(data)); // ✅ user 저장!
          navigate("/");
        })
        .catch((err) => {
          console.error("사용자 정보 가져오기 실패:", err);
          navigate("/");
        });
    } else {
      alert("토큰이 없습니다.");
      navigate("/");
    }
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
}

export default OauthCallbackKakao;
