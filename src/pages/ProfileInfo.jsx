import { useState, useEffect } from "react";
import profileDefault from "../assets/profile_default.jpg";
import ProfileField from "../components/ProfileField";
import MapModal from "../components/MapModal";

function ProfileInfo() {
  const [nickname, setNickname] = useState("example_name");
  const [email, setEmail] = useState("example_name");
  const [region, setRegion] = useState("example_name");
  const [loading, setLoading] = useState(true);
  const [showMapModal, setShowMapModal] = useState(false); //지도 모달 상태

  const token = localStorage.getItem("kakao_token");
  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const handleMapSelect = ({ addressText }) => {
    setRegion(addressText); // 주소만 사용
    setShowMapModal(false);
  };

  // ✅ 유저 정보 불러오기  (GET /api/member/me)
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${BACKEND_API_URL}/member/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("유저 정보 불러오기 실패");
        const data = await res.json();
        console.log(data);
        setNickname(data.nickname);
        setEmail(data.email);
        setRegion(data.region);
      } catch (e) {
        alert(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  // TODO: 각 필드 수정 시 PATCH /api/member/nickname 등으로 변경 요청
  const handleNicknameEdit = async (newNickname) => {
    try {
      const res = await fetch(`${BACKEND_API_URL}/member/nickname`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nickname: newNickname }),
      });
      if (!res.ok) throw new Error("닉네임 변경 실패");
      alert("닉네임이 성공적으로 변경되었습니다!");
      // 필요하다면 setNickname(newNickname) 등으로 상태도 갱신
    } catch (e) {
      alert(e.message);
    }
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
          onEdit={() => handleNicknameEdit(e.target.value)}
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
          onEdit={() => setShowMapModal(true)}
        />
      </div>

      <button className="withdraw-btn " onClick={handleWithdraw}>
        <span className="sb-14">회원 탈퇴</span>
      </button>

      {/*지도 모달 연결 */}
      {showMapModal && (
        <MapModal
          onClose={() => setShowMapModal(false)}
          onSelect={handleMapSelect}
        />
      )}
    </div>
  );
}

export default ProfileInfo;
