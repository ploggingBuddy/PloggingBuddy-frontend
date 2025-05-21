import { useNavigate } from "react-router-dom";
import { formatDate, formatAddress, formatDateTime } from "../utils/format";

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
        <div className={`meeting-status ${statusClass} rg-12`}>
          {postStatus === "GATHERING_CONFIRMED" ? "모집 완료" : "모집 중"}
        </div>
        {/* <span className="rg-14">생성자: {leadUserNickname}</span> */}
        <span className="rg-14">
          현재 참여 인원: {participantCurrentNumber}/{participantMaxNumber}명
        </span>
        <span className="rg-14">모집 기한 {formatDate(gatheringEndTime)}</span>
        <span className="rg-14">모임 장소: {formatAddress(detailAddress)}</span>
        <div className="card-desc rg-14">{content}</div>
      </div>
    </div>
  );
}
export default MeetingCard;
