import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dummyMeetups from "../data/dummyMeetups";

function MapSection() {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");

    const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;
    //kakaoAPI
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 5,
        };

        const map = new window.kakao.maps.Map(container, options);

        const markerImage = new window.kakao.maps.MarkerImage(
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
          new window.kakao.maps.Size(25, 41),
          { offset: new window.kakao.maps.Point(12, 41) }
        );

        let currentOverlay = null;

        dummyMeetups.forEach((meetup) => {
          const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(meetup.lat, meetup.lng),
            image: markerImage,
          });

          const contentDiv = document.createElement("div");
          contentDiv.innerHTML = `
            <div style="
              width: 300px;
              background: white;
              border-radius: 10px;
              padding: 16px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
              font-family: sans-serif;
              overflow: hidden;
            ">
              <h3 style="margin: 0 0 8px;">${meetup.title}</h3>
              <div style="font-size: 12px; color: #666; margin-bottom: 8px;">
                <span style="background:#e0f7e9; color:#2e7d32; padding: 2px 6px; border-radius: 4px; font-weight: bold;">
                  모임 중
                </span> 
                &nbsp; 최대 ${meetup.max || 10}명 · ${
            meetup.deadline || "3시간"
          } 후 마감
              </div>
              <div style="font-size: 13px; margin-bottom: 6px;">📍 ${
                meetup.location
              }</div>
              <div style="display: flex; gap: 4px; margin-bottom: 8px;">
                ${meetup.images
                  .slice(0, 2)
                  .map(
                    (img) => `
                  <img src="${img}" style="width: 48%; height: 60px; object-fit: cover; border-radius: 4px;" />
                `
                  )
                  .join("")}
              </div>
              <p style="
                font-size: 13px;
                color: #444;
                margin-bottom: 10px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              ">
                ${meetup.description || "설명이 준비 중입니다."}
              </p>
              <button id="detail-btn-${meetup.id}" style="
                width: 100%;
                padding: 8px;
                background: #a5d6a7;
                color: #1b5e20;
                border: none;
                border-radius: 6px;
                font-weight: bold;
                cursor: pointer;
              ">상세 정보 보기</button>
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
              const detailBtn = document.getElementById(
                `detail-btn-${meetup.id}`
              );
              if (detailBtn) {
                detailBtn.onclick = () => {
                  navigate(`/meeting/${meetup.id}`);
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
  }, [navigate]);

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
