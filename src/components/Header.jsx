import React from "react";

// Assets
import logo from "../assets/logo.svg";

// CSS
import "../css/header.css";
import "../css/typography.css";

function Header({ onMeetingClick }) {
  return (
    <header>
      <button onClick={() => navigate("/")}>
        <img className="logo" src={logo} alt="로고" />
      </button>
      <div className="header-menu">
        <div>
          <a className="sb-14" href="/main">
            모임
          </a>
        </div>
        <div>
          <a className="sb-14" href="/mypage">
            마이페이지
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
