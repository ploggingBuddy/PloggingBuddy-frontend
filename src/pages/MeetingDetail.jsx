import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/meetingDetail.css";

function MeetingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentParticipants, setCurrentParticipants] = useState(0);
  const [isCreator, setIsCreator] = useState(false);
  const [maxParticipants, setMaxParticipants] = useState(10);
  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const fetchMeetingDetail = async () => {
      const token = localStorage.getItem("kakao_token");
      if (!token) {
        setError("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${BACKEND_API_URL}/gathering/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("kakao_token");
            setError("로그인이 만료되었습니다. 다시 로그인해주세요.");
            navigate("/login");
            return;
          }
          throw new Error("모임 정보를 불러오는데 실패했습니다.");
        }

        const data = await response.json();
        console.log(data);
        setMeeting(data);
        setMaxParticipants(data.maxParticipants);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingDetail();
  }, [id, navigate, BACKEND_API_URL]);

  if (loading) return <div className="loading">로딩중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!meeting) return <div className="error">모임을 찾을 수 없습니다.</div>;

  // meeting이 있을 때만 statusClass 계산
  const statusClass =
    meeting.gatheringStatus === "GATHERING_CONFIRMED"
      ? "closed"
      : meeting.gatheringStatus === "GATHERING_PENDING"
      ? "hold"
      : "";

  return (
    <div className="meeting-detail-wrapper">
      <div className="meeting-detail-container">
        <h1 className="meeting-title sb-24">{meeting.title}</h1>
        <main className="meeting-content">
          {/* 상태 뱃지 */}
          <div className={`meeting-status ${statusClass} rg-12`}>
            {meeting.gatheringStatus === "GATHERING_CONFIRMED"
              ? "모집 완료"
              : meeting.gatheringStatus === "GATHERING_PENDING"
              ? "모집 마감 보류"
              : "모집 진행중"}
          </div>
          {/* 상세 정보 */}
          <div className="meeting-info">
            <div className="info-item">
              <span className="label rg-14">참여 인원</span>
              <span className="value sb-14">
                {meeting.currentParticipants} / {meeting.participantMaxNumber}명
              </span>
            </div>

            {/* 모임 생성자인 경우에만 인원 변경 버튼 표시 */}
            {isCreator && (
              <div className="info-item">
                <div className="max-participants-control">
                  <input
                    type="range"
                    min={meeting.currentParticipants}
                    max={10}
                    value={meeting.participantMaxNumber}
                    className="max-participants-range"
                    style={{
                      background: `linear-gradient(
                        to right,
                        var(--primary) 0%,
                        var(--primary) ${
                          ((participantMaxNumber -
                            meeting.currentParticipants) /
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
              <span className="value sb-14">{meeting.gatheringEndTime}</span>
            </div>
            <div className="info-item">
              <span className="label rg-14">모임 장소</span>
              <span className="value sb-14">{meeting.address}</span>
            </div>
            <div className="info-item">
              <span className="label rg-14">모임 시간</span>
              <span className="value sb-14">{meeting.gatheringTime}</span>
            </div>
          </div>
          <div className="meeting-description">
            <p className="rg-14">
              {meeting.content || "모임 설명이 없습니다."}
            </p>
          </div>
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
