import React from "react";
import mapIcon from "../assets/solar_map-linear.png"; // 경로 맞게 수정

const LocationInput = ({ location, onChange, onMapToggle }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <label style={{ fontWeight: "bold", marginBottom: "10px" }}>모임 장소</label>
      <div style={{ display: "flex", width: "100%" }}>
        <input
          type="text"
          placeholder="장소를 입력하거나 지도를 선택하세요"
          value={location}
          onChange={onChange}
          style={{
            flex: 1,
            padding: "10px 12px",
            border: "1px solid #ccc",
            borderTopLeftRadius: "6px",
            borderBottomLeftRadius: "6px",
            borderRight: "none", // 버튼과 경계 없게
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
        <button
          type="button"
          onClick={onMapToggle}
          style={{
            width: "48px",
            height: "42px",
            border: "1px solid #ccc",
            borderLeft: "none",
            borderTopRightRadius: "6px",
            borderBottomRightRadius: "6px",
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
      </div>
    </div>
  );
};

export default LocationInput;
