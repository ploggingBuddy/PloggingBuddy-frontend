import locationIcon from "../assets/location.png";
import { useNavigate } from "react-router-dom";

function MeetingCard({
  content,
  detailAddress,
  gatheringEndTime,
  gatheringName,
  imageUrlList,
  participantCurrentNumber,
  participantMaxNumber,
  postId,
  postStatus,
}) {
  // TODO: 카드 클릭 시 상세 페이지 이동 (ex: /meeting/:id)
  let statusClass = "";
  if (postStatus === "GATHERING_CONFIRMED") statusClass = "closed";
  else if (postStatus === "GATHERING_PENDING") statusClass = "hold";
  const navigate = useNavigate();

  return (
    <div
      className="meeting-card"
      onClick={() => navigate(`/meeting/${postId}`)}
    >
      <div className="card-title sb-16">{gatheringName}</div>
      <div className="card-content">
        <div className="card-meta">
          <div className={`meeting-status ${statusClass} rg-12`}>
            {postStatus === "GATHERING_CONFIRMED" ? "모집 완료" : "모집 중"}
          </div>
          <span className="rg-14">최대 {participantMaxNumber}명</span>
          <span className="rg-14">{gatheringEndTime}</span>
        </div>
        <div className="card-location">
          <img src={locationIcon} alt="위치" />
          <span className="rg-14">{detailAddress}</span>
        </div>
        <div className="card-desc rg-14">{content}</div>
        {/* <img src={img} alt="썸네일" className="card-img" /> */}
      </div>
    </div>
  );
}
export default MeetingCard;
