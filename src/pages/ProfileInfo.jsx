import { useState, useEffect } from "react";
import profileDefault from "../assets/profile_default.jpg";
import ProfileField from "../components/ProfileField";
import MapModal from "../components/MapModal";
import editIcon from "../assets/edit.svg";
import mapIcon from "../assets/solar_map-linear.png";

function ProfileInfo() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [tempNickname, setTempNickname] = useState(null);
  const [tempRegion, setTempRegion] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const handleMapSelect = ({ latlng, addressText }) => {
    setTempRegion(addressText);
    setCoordinates(latlng);
    setShowMapModal(false);
  };

  // 유저 정보 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userData || isDirty) {
        const token = localStorage.getItem("kakao_token");
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
          setTempNickname(data.nickname);
          setTempRegion(data.detailAddress);
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
          setIsDirty(false);
        }
      }
    };

    fetchUserData();
  }, [isDirty, userData, BACKEND_API_URL]);

  const handleNicknameEdit = async () => {
    const token = localStorage.getItem("kakao_token");
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
      alert("닉네임이 성공적으로 변경되었습니다!");
      setIsDirty(true);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleAddressEdit = async () => {
    const token = localStorage.getItem("kakao_token");
    try {
      const res = await fetch(`${BACKEND_API_URL}/member/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          detailAddress: tempRegion,
          latitude: coordinates.lat,
          longitude: coordinates.lng,
        }),
      });
      if (!res.ok) throw new Error("지역 정보 변경 실패");
      alert("지역 정보가 성공적으로 변경되었습니다!");
      setIsDirty(true);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleWithdraw = () => {
    alert("정말로 회원을 탈퇴하시겠습니까?");
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="profile-info">
      <img
        src={userData?.profileImageUrl ?? profileDefault}
        alt="프로필"
        className="profile-img"
      />
      <div className="profile-fields">
        <ProfileField
          label="닉네임"
          value={tempNickname ?? userData?.nickname}
          onChange={(e) => setTempNickname(e.target.value)}
          onEdit={handleNicknameEdit}
        />
        <div>
          <label className="rg-14">이메일</label>
          <div>
            <span className="rg-14">{userData?.email}</span>
          </div>
        </div>
        <div>
          <label className="rg-14">지역정보</label>
          <div className="profile-field--input location-input">
            <input
              value={tempRegion ?? userData?.detailAddress}
              onChange={(e) => setTempRegion(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowMapModal(true)}
              style={{
                backgroundColor: "white",
                width: "48px",
                height: "42px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >
              <img
                src={mapIcon}
                alt="지도 열기"
                style={{ width: "20px", height: "20px" }}
              />
            </button>
            <button
              type="button"
              className="edit-btn"
              onClick={handleAddressEdit}
            >
              <img className="edit-icon" src={editIcon} alt="edit" />
            </button>
          </div>
        </div>
      </div>

      <button className="withdraw-btn" onClick={handleWithdraw}>
        <span className="sb-14">회원 탈퇴</span>
      </button>

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
