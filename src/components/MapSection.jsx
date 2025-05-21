import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

function MapSection() {
  const navigate = useNavigate();
  const [meetups, setMeetups] = useState([]);
  const token = localStorage.getItem("kakao_token");

  // 1. 특정 위치 기반으로 모임 데이터 fetch
  useEffect(() => {
    const fetchMeetups = async () => {
      const lat = 37.56367012895697;
      const lng = 126.97561977957132;

      try {
        const response = await fetch(
          `${BACKEND_API_URL}/gathering/spot/${lat}/${lng}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setMeetups(data.gatheringPreviewList || []);
      } catch (error) {
        console.error("모임 데이터 요청 실패:", error);
      }
    };

    fetchMeetups();
  }, [token]);

  // 2. 지도 로딩 및 마커 표시
  useEffect(() => {
    const script = document.createElement("script");
    const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;

    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.56367012895697, 126.97561977957132),
          level: 5,
        };
        const map = new window.kakao.maps.Map(container, options);

        const markerImage = new window.kakao.maps.MarkerImage(
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
          new window.kakao.maps.Size(25, 41),
          { offset: new window.kakao.maps.Point(12, 41) }
        );

        let currentOverlay = null;

        meetups.forEach((item) => {
          const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(item.latitude, item.longitude),
            image: markerImage,
          });

          const contentDiv = document.createElement("div");
          contentDiv.innerHTML = `
            <div style="width: 260px; background: white; padding: 16px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); font-family: sans-serif;">
              <div style="font-weight: bold; font-size: 15px; margin-bottom: 8px; line-height: 1.4; max-height: 2.8em; overflow: hidden; text-overflow: ellipsis;">
                ${detail.title}
              </div>

              <span style="display: inline-block; background: #e0f2ff; color: #1976d2; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: 600; margin-bottom: 10px;">
                모집 중
              </span>

              <div style="font-size: 14px; margin-bottom: 4px;">최대 인원: ${detail.participantMaxNumber}명</div>
              <div style="font-size: 14px; margin-bottom: 4px;">모집 마감일: ${endMonth}/${endDay}</div>
              <div style="font-size: 14px; margin-bottom: 12px;">📍 ${detail.address}</div>

              <button id="btn-${item.gatheringPostId}" style="width: 100%; padding: 10px 0; background: #dcedc8; color: #33691e; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                상세 정보 보기
              </button>
            </div>
          `;

          const overlay = new window.kakao.maps.CustomOverlay({
            content: contentDiv,
            position: marker.getPosition(),
            yAnchor: 1.4,
          });

          window.kakao.maps.event.addListener(marker, "click", () => {
            if (currentOverlay) currentOverlay.setMap(null);
            overlay.setMap(map);
            currentOverlay = overlay;

            setTimeout(() => {
              const btn = document.getElementById(`btn-${item.gatheringPostId}`);
              if (btn) {
                btn.onclick = () => {
                  navigate(`/meeting/${item.gatheringPostId}`);
                };
              }
            }, 0);
          });
        });
      });
    };

    return () => {
      const existing = document.querySelector('script[src*="dapi.kakao.com"]');
      if (existing) document.head.removeChild(existing);
    };
  }, [meetups, navigate]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    />
  );
}

export default MapSection;
