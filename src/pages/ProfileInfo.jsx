import { useState, useEffect } from "react";
import profileDefault from "../assets/profile_default.jpg";
import ProfileField from "../components/ProfileField";

function ProfileInfo() {
  const [nickname, setNickname] = useState("example_name");
  const [bio, setBio] = useState("example_name");
  const [email, setEmail] = useState("example_name");
  const [region, setRegion] = useState("example_name");
  const [loading, setLoading] = useState(true);
  // ✅ 유저 정보 불러오기  (GET /api/member/me)
  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("kakao_token");
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/member/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("유저 정보 불러오기 실패");
        const data = await res.json();
        console.log(data);
      } catch (e) {
        alert(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  // TODO: 각 필드 수정 시 PATCH /api/member/nickname 등으로 변경 요청
  const handleNicknameEdit = (field) => {};

  const handleBioEdit = (field) => {
    // 예시: fetch('/api/user/profile', { method: 'PATCH', body: ... })
    alert(`${field}이(가) 수정되었습니다.`);
  };

  // TODO: 회원 탈퇴 API 연동 (DELETE /api/user)
  const handleWithdraw = () => {
    alert("정말로 회원을 탈퇴하시겠습니까?");
    // fetch('/api/user', { method: 'DELETE' }) 등
  };

  return (
    <div className="profile-info">
      <img src={profileDefault} alt="프로필" className="profile-img" />
      <div className="profile-fields">
        <ProfileField
          label="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onEdit={() => handleEdit("닉네임")}
        />
        <div>
          <label className="rg-14">이메일</label>
          <div>
            <span className="rg-14">{email}</span>
          </div>
        </div>
        <ProfileField
          label="지역 정보"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          onEdit={() => handleEdit("지역 정보")}
        />
      </div>

      <button className="withdraw-btn " onClick={handleWithdraw}>
        <span className="sb-14">회원 탈퇴</span>
      </button>
    </div>
  );
}

export default ProfileInfo;
