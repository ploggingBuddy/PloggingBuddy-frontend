import { useState, useEffect } from "react";
import profileDefault from "../assets/profile_default.jpg";
import ProfileField from "../components/ProfileField";
import MapModal from "../components/MapModal";
import { data } from "react-router-dom";
import editIcon from "../assets/edit.svg";
import locationIcon from "../assets/location.png";

function ProfileInfo() {
  const [nickname, setNickname] = useState(null);
  const [tempNickname, setTempNickname] = useState(null); // 임시 닉네임 상태 추가
  const [email, setEmail] = useState(null);
  const [region, setRegion] = useState(null);
  const [tempRegion, setTempRegion] = useState(null); // 임시 지역 정보 상태 추가
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 }); // 위도/경도 상태 추가
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false); // 수정 시 true
  const [showMapModal, setShowMapModal] = useState(false); //지도 모달 상태

  const token = localStorage.getItem("kakao_token");
  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const handleMapSelect = ({ latlng, addressText }) => {
    setRegion(addressText);
    setTempRegion(addressText);
    setCoordinates(latlng); // 위도/경도 정보 저장
    setShowMapModal(false);
  };

  // 지역 정보 수정 함수
  const handleAddressEdit = async () => {
    try {
      const res = await fetch(`${BACKEND_API_URL}/member/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address: {
            detailAddress: tempRegion,
            latitude: coordinates.lat,
            longitude: coordinates.lng,
          },
        }),
      });

      if (!res.ok) throw new Error("지역 정보 변경 실패");

      setRegion(tempRegion);
      setIsDirty(true);
      alert("지역 정보가 성공적으로 변경되었습니다!");
    } catch (e) {
      alert(e.message);
    }
  };

  // ✅ 유저 정보 불러오기  (GET /api/member/me)
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userData || isDirty) {
        setLoading(true);
        try {
          const res = await fetch(`${BACKEND_API_URL}/member/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!res.ok) throw new Error("유저 정보 불러오기 실패");
          const data = await res.json();
          setUserData(data);
          setNickname(data.nickname);
          setTempNickname(data.nickname);
          setEmail(data.email);
          setRegion(data.region);
          setTempRegion(data.region);
          // 기존 주소의 위도/경도 정보가 있다면 설정
          if (data.address) {
            setCoordinates({
              lat: data.address.latitude || 0,
              lng: data.address.longitude || 0,
            });
          }
        } catch (e) {
          alert(e.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [isDirty, token, userData, BACKEND_API_URL]);

  // TODO: 각 필드 수정 시 PATCH /api/member/nickname 등으로 변경 요청
  const handleNicknameEdit = async () => {
    if (!tempNickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_API_URL}/member/nickname`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nickname: tempNickname }),
      });

      if (!res.ok) throw new Error("닉네임 변경 실패");

      // 상태 업데이트를 한 번에 처리
      setNickname(tempNickname);
      setIsDirty(true);
      alert("닉네임이 성공적으로 변경되었습니다!");
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
          value={tempNickname ?? nickname}
          onChange={(e) => setTempNickname(e.target.value)}
          onEdit={handleNicknameEdit}
        />
        <div>
          <label className="rg-14">이메일</label>
          <div>
            <span className="rg-14">{email}</span>
          </div>
        </div>
        <div>
          <label className="rg-14">지역정보</label>
          <div className="profile-field--input location-input">
            <input
              value={tempRegion ?? region}
              onChange={(e) => setTempRegion(e.target.value)}
            />
            <button
              type="button"
              className="edit-btn"
              onClick={handleAddressEdit}
            >
              <img className="edit-icon" src={editIcon} alt="edit" />
            </button>
            <button
              type="button"
              className="edit-btn"
              onClick={() => setShowMapModal(true)}
            >
              <img
                className="location-icon"
                src={locationIcon}
                alt="location"
              />
            </button>
          </div>
        </div>
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
