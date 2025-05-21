import MeetingCard from "./MeetingCard";

function MeetingCardList({ title, meetings }) {
  return (
    <div className="meeting-card-list">
      <span className="sb-16">{title}</span>
      <div className="card-list-row">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.postId} {...meeting} />
        ))}
      </div>
    </div>
  );
}

export default MeetingCardList;
