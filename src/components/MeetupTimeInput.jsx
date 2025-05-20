import React from "react";

const MeetupTimeInput = ({ meetupTime, onChange }) => {
  const fields = [
    { key: "month", label: "월", placeholder: "MM", min: 1, max: 12 },
    { key: "day", label: "일", placeholder: "DD", min: 1, max: 31 },
    { key: "hour", label: "시", placeholder: "HH", min: 0, max: 23 },
    { key: "minute", label: "분", placeholder: "mm", min: 0, max: 59 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <label style={{ fontWeight: "bold", marginBottom: "10px" }}>모임 시간</label>
      <div style={{ display: "flex", gap: "10px", width: "100%" }}>
        {fields.map(({ key, label, placeholder, min, max }) => (
          <div key={key} style={{ position: "relative", flex: 1 }}>
            <input
              type="number"
              placeholder={placeholder}
              value={meetupTime[key] || ""}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val) && (val === "" || (Number(val) >= min && Number(val) <= max))) {
                  onChange(key, val);
                }
              }}
              min={min}
              max={max}
              style={{
                padding: "8px",
                width: "100%",
                paddingRight: "28px",
                boxSizing: "border-box",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#888",
                pointerEvents: "none",
                fontSize: "14px",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetupTimeInput;

