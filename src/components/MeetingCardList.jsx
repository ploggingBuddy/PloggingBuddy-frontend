import MeetingCard from "./MeetingCard";

// TODO: 백엔드에서 모임 리스트 받아오기 (GET /api/meetings?type=attend, GET /api/meetings?type=created)
const mockCards = [
  // 실제로는 useEffect에서 fetch로 받아온 데이터로 대체
  {
    id: 1,
    title: "모임 이름모임 이름...",
    status: "모집 중",
    max: "N",
    date: "~3/30",
    location: "서울시 은평구",
    desc: "모임 설명...",
    img: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    title: "모임 이름모임 이름...모임 이름모임 이름...",
    status: "모집 마감 보류",
    max: "N",
    date: "~3/30",
    location: "서울시 은평구",
    desc: "모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명모임 설명",
    img: "https://picsum.photos/200/300",
  },
  {
    id: 3,
    title: "모임 이름모임 이름...",
    status: "모집 마감",
    max: "N",
    date: "~3/30",
    location: "서울시 은평구",
    desc: "모임 설명...",
    img: "https://picsum.photos/200/300",
  },
];

function MeetingCardList({ title }) {
  // TODO: useEffect로 API 호출 후 setState로 데이터 저장
  // ex) useEffect(() => { fetch('/api/meetings?type=attend').then(...) }, [])
  return (
    <div className="meeting-card-list">
      <span className="sb-14">{title}</span>
      <div className="card-list-row">
        {mockCards.map((card) => (
          <MeetingCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}

export default MeetingCardList;
