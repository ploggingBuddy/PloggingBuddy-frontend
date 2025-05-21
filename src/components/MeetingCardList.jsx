import MeetingCard from "./MeetingCard";

function MeetingCardList({ meetings }) {
  return (
    <div className="meeting-card-list">
      <span className="sb-14">{meetings.gatheringName}</span>
      <div className="card-list-row">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.postId} {...meeting} />
        ))}
      </div>
    </div>
  );
}

export default MeetingCardList;
