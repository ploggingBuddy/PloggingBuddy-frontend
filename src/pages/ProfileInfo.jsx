import { useState } from "react";
import profileDefault from "../assets/profile_default.jpg";
import ProfileField from "../components/ProfileField";
import MapModal from "../components/MapModal";
import editIcon from "../assets/edit.svg";
import mapIcon from "../assets/solar_map-linear.png";

function ProfileInfo({ nickname, email, address, profileImage, onUpdate }) {
  const [showMapModal, setShowMapModal] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [editNickname, setEditNickname] = useState(nickname);
  const [editAddress, setEditAddress] = useState(address);

  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const handleMapSelect = ({ latlng, addressText }) => {
    setEditAddress(addressText);
    setCoordinates(latlng);
    setShowMapModal(false);
  };

  const handleNicknameEdit = async () => {
    const token = localStorage.getItem("kakao_token");
    if (!editNickname) {
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
        body: JSON.stringify({ nickname: editNickname }),
      });
      if (!res.ok) throw new Error("닉네임 변경 실패");
      alert("닉네임이 성공적으로 변경되었습니다!");
      onUpdate();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleAddressEdit = async () => {
    const token = localStorage.getItem("kakao_token");
    if (!editAddress) {
      alert("주소를 입력해주세요.");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_API_URL}/member/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          detailAddress: editAddress,
          latitude: coordinates.lat,
          longitude: coordinates.lng,
        }),
      });
      if (!res.ok) throw new Error("지역 정보 변경 실패");
      alert("지역 정보가 성공적으로 변경되었습니다!");
      onUpdate();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleWithdraw = () => {
    alert("정말로 회원을 탈퇴하시겠습니까?");
  };

  if (loading)
    return (
      <div>
        <div>로딩 중...</div>
      </div>
    );

  return (
    <div className="profile-info">
      <img
        src={profileImage ?? profileDefault}
        alt="프로필"
        className="profile-img"
      />
      <div className="profile-fields">
        <div>
          <label className="rg-14">닉네임</label>
          <div className="profile-field--input">
            <input
              type="text"
              value={editNickname}
              onChange={(e) => setEditNickname(e.target.value)}
            />
            <button
              type="button"
              className="edit-btn"
              onClick={handleNicknameEdit}
            >
              <img className="edit-icon" src={editIcon} alt="edit" />
            </button>
          </div>
        </div>
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
              type="text"
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowMapModal(true)}
              className="map-btn"
            >
              <img src={mapIcon} alt="지도 열기" />
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
