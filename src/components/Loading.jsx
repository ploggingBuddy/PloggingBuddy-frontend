import React from "react";
import "../css/loading.css";

function Loading({ overlay = false, text = "로딩 중" }) {
  const containerClass = overlay ? "loading-overlay" : "";

  return (
    <div className={containerClass}>
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">
          {text}
          <span className="loading-dots"></span>
        </p>
      </div>
    </div>
  );
}

export default Loading;
