import React from "react";
import "../css/addressPopup.css";

function AddressPopup({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="popup-overlay">
      <div className="address-popup">
        <div className="popup-content">
          <h2 className="sb-18">주소 정보 필요</h2>
          <p className="rg-14">모임 참여를 위해 주소 정보를 등록해주세요.</p>
          <div className="popup-buttons">
            <button
              className="primary-btn"
              onClick={() => (window.location.href = "/mypage")}
            >
              <span className="sb-14">주소 등록하기</span>
            </button>
            <button className="secondary-btn" onClick={onClose}>
              <span className="sb-14">나중에 하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressPopup;
