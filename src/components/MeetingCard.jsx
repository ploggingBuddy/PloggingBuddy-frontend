import locationIcon from "../assets/location.png";
import { useNavigate } from "react-router-dom";

function MeetingCard({ id, title, status, max, date, location, desc, img }) {
  // TODO: 카드 클릭 시 상세 페이지 이동 (ex: /meeting/:id)
  let statusClass = "";
  if (status === "모집 마감") statusClass = "closed";
  else if (status === "모집 마감 보류") statusClass = "hold";
  const navigate = useNavigate();

  return (
    <div className="meeting-card" onClick={() => navigate(`/meeting/${id}`)}>
      <div className="card-title sb-16">{title}</div>
      <div className="card-content">
        <div className="card-meta">
          <div className={`meeting-status ${statusClass} rg-12`}>{status}</div>
          <span className="rg-14">최대 {max}명</span>
          <span className="rg-14">{date}</span>
        </div>
        <div className="card-location">
          <img src={locationIcon} alt="위치" />
          <span className="rg-14">{location}</span>
        </div>
        <div className="card-desc rg-14">{desc}</div>
        <img src={img} alt="썸네일" className="card-img" />
      </div>
    </div>
  );
}
export default MeetingCard;
