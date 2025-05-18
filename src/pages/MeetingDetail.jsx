import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/meetingDetail.css";

function MeetingDetail() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [currentParticipants, setCurrentParticipants] = useState(0);
  const [isCreator, setIsCreator] = useState(false); // 모임 생성자 여부
  const [maxParticipants, setMaxParticipants] = useState(10);

  useEffect(() => {
    // TODO: 백엔드에서 모임 상세정보 받아오기
    setMeeting({
      id,
      title: "모임 제목 예시",
      desc: "모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명ㅎ모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명ㅎ모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명ㅎ모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명ㅎ",
      images: [
        "https://picsum.photos/400/200",
        "https://picsum.photos/400/200",
      ],
      status: "모집중", // 모집중, 모집마감, 모집마감보류
      maxParticipants: 10,
      currentParticipants: 5,
      date: "2024-03-20",
      time: "14:00",
      location: "서울시 강남구",
      creatorId: "user123", // 모임 생성자 ID
    });

    // TODO: 실제로는 백엔드에서 현재 로그인한 사용자가 모임 생성자인지 확인
    setIsCreator(true); // 임시로 true로 설정
  }, [id]);

  const handleJoinMeeting = () => {
    if (!meeting) return;
    if (currentParticipants < meeting.maxParticipants) {
      setCurrentParticipants((prev) => prev + 1);
    }
  };

  const handleLeaveMeeting = () => {
    if (!meeting) return;
    if (currentParticipants > 0) {
      setCurrentParticipants((prev) => prev - 1);
    }
  };

  const handleMaxParticipantsChange = (e) => {
    const newValue = parseInt(e.target.value);
    setMaxParticipants(newValue);
    // TODO: 백엔드에 최대 인원 변경 요청
  };

  // meeting이 null일 때 로딩 표시
  if (!meeting) return <div className="loading">로딩중...</div>;

  // meeting이 있을 때만 statusClass 계산
  const statusClass =
    meeting.status === "모집 마감"
      ? "closed"
      : meeting.status === "모집 마감 보류"
      ? "hold"
      : "";

  return (
    <div className="meeting-detail-wrapper">
      <div className="meeting-detail-container">
        <h1 className="meeting-title sb-24">{meeting.title}</h1>
        <main className="meeting-content">
          {/* 상태 뱃지 */}
          <div className={`meeting-status ${statusClass} rg-12`}>
            {meeting.status}
          </div>

          {/* 상세 정보 */}
          <div className="meeting-info">
            <div className="info-item">
              <span className="label rg-14">참여 인원</span>
              <span className="value sb-14">
                {meeting.currentParticipants} / {meeting.maxParticipants}명
              </span>
            </div>

            {/* 모임 생성자인 경우에만 인원 변경 버튼 표시 */}
            {isCreator && (
              <div className="info-item">
                <div className="max-participants-control">
                  <input
                    type="range"
                    min={meeting.currentParticipants}
                    max={meeting.maxParticipants}
                    value={maxParticipants}
                    onChange={handleMaxParticipantsChange}
                    className="max-participants-range"
                    style={{
                      background: `linear-gradient(
                        to right,
                        var(--primary) 0%,
                        var(--primary) ${
                          ((maxParticipants - meeting.currentParticipants) /
                            (meeting.maxParticipants -
                              meeting.currentParticipants)) *
                          100
                        }%,
                        var(--gray200) ${
                          ((maxParticipants - meeting.currentParticipants) /
                            (meeting.maxParticipants -
                              meeting.currentParticipants)) *
                          100
                        }%,
                        var(--gray200) 100%
                      )`,
                    }}
                  />
                  <span className="max-participants-value sb-14">
                    {maxParticipants}명
                  </span>
                  <button className="change-max-btn">
                    <span className="sb-14">인원 변경</span>
                  </button>
                </div>
              </div>
            )}

            <div className="info-item">
              <span className="label rg-14">모집 기간</span>
              <span className="value sb-14">{meeting.date}</span>
            </div>
            <div className="info-item">
              <span className="label rg-14">모임 장소</span>
              <span className="value sb-14">{meeting.location}</span>
            </div>
          </div>

          <div className="meeting-description">
            <p className="rg-14">{meeting.desc || "모임 설명이 없습니다."}</p>
          </div>

          {/* 이미지 섹션 */}
          <div className="meeting-image-section">
            {meeting.images ? (
              <div className="image-container">
                {meeting.images.map((image, index) => (
                  <div key={index} className="image-wrapper">
                    <img
                      src={image}
                      alt={`${meeting.title} 이미지 ${index + 1}`}
                    />
                    {/* 모임 생성자인 경우에만 이미지 변경 버튼 표시 */}
                    {isCreator && (
                      <button
                        className="change-image-btn"
                        onClick={() => {
                          // TODO: 이미지 변경 로직 구현
                          console.log(`이미지 ${index + 1} 변경`);
                        }}
                      >
                        이미지 변경
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="image-placeholder">
                <span>이미지 없음</span>
              </div>
            )}
          </div>

          {/* 모임 생성자가 아닌 경우에만 참여하기 버튼 표시 */}
          {!isCreator && (
            <button
              className="join-meeting-btn"
              onClick={handleJoinMeeting}
              disabled={meeting.status === "모집 마감"}
            >
              <span className="sb-14">신청하기</span>
            </button>
          )}
        </main>
      </div>
    </div>
  );
}

export default MeetingDetail;
