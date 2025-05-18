import React from "react";

const TitleInput = ({ value, onChange }) => (
  <div>
    <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "30px" }}>
      모임 이름
    </h2>
    <input
      type="text"
      placeholder="모임 이름을 입력하세요"
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "30px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    />
  </div>
);

export default TitleInput;
