import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;

function MapSection({ onMapLoaded }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("kakao_token");

  const [meetups, setMeetups] = useState([]);
  const [userPosition, setUserPosition] = useState({
    lat: 37.5665,
    lng: 126.978,
  });

  const loadKakaoSDK = () =>
    new Promise((resolve) => {
      if (window.kakao?.maps?.services) {
        resolve();
        return;
      }

      const existing = document.getElementById("kakao-map-sdk");
      if (!existing) {
        const script = document.createElement("script");
        script.id = "kakao-map-sdk";
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false&libraries=services`;
        script.onload = () => {
          window.kakao.maps.load(() => resolve());
        };
        document.head.appendChild(script);
      } else {
        window.kakao.maps.load(() => resolve());
      }
    });

  const fallbackToGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => {
          setUserPosition({ lat: 37.5665, lng: 126.978 });
        }
      );
    } else {
      setUserPosition({ lat: 37.5665, lng: 126.978 });
    }
  };

  useEffect(() => {
    const getUserPositionFromAddress = async () => {
      try {
        const res = await fetch(`${BACKEND_API_URL}/member/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const address = data.detailAddress;
        if (!address) {
          fallbackToGPS();
          return;
        }

        const simplified = address.split(" ").slice(0, 3).join(" ");
        await loadKakaoSDK();

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(simplified, (result, status) => {
          if (
            status === window.kakao.maps.services.Status.OK &&
            result.length > 0
          ) {
            const lat = parseFloat(result[0].y);
            const lng = parseFloat(result[0].x);
            setUserPosition({ lat, lng });
          } else {
            fallbackToGPS();
          }
        });
      } catch (err) {
        console.warn("❌ 주소 기반 위치 조회 실패", err);
        fallbackToGPS();
      }
    };

    getUserPositionFromAddress();
  }, [token]);

  useEffect(() => {
    const fetchMeetups = async () => {
      try {
        const res = await fetch(
          `${BACKEND_API_URL}/gathering/spot/${userPosition.lat}/${userPosition.lng}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setMeetups(data.gatheringPreviewList || []);
      } catch (err) {
        console.error("❌ 모집 글 요청 실패", err);
      }
    };
    fetchMeetups();
  }, [userPosition, token]);

  useEffect(() => {
    const renderMap = async () => {
      try {
        await loadKakaoSDK();

        const container = document.getElementById("map");
        if (!container) return;

        const map = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(userPosition.lat, userPosition.lng),
          level: 5,
        });

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

          window.kakao.maps.event.addListener(marker, "click", async () => {
            if (currentOverlay) currentOverlay.setMap(null);

            try {
              const res = await fetch(`${BACKEND_API_URL}/gathering/${item.gatheringPostId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              const detail = await res.json();
              const endDate = new Date(detail.gatheringEndTime);

              const content = `
                <div style="width: 260px; background: white; padding: 16px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); font-family: sans-serif;">
                  <div style="font-weight: bold; font-size: 15px; margin-bottom: 8px;">${detail.title}</div>
                  <span style="display: inline-block; background: #e0f2ff; color: #1976d2; padding: 2px 6px; border-radius: 4px; font-size: 12px;">모집 중</span>
                  <div style="font-size: 14px; margin: 6px 0;">최대 인원: ${detail.participantMaxNumber}명</div>
                  <div style="font-size: 14px;">모집 마감일: ${endDate.getMonth() + 1}/${endDate.getDate()}</div>
                  <div style="font-size: 14px; margin-bottom: 8px;">📍 ${detail.address}</div>
                  <button id="btn-${item.gatheringPostId}" style="width: 100%; padding: 10px; background: #dcedc8; border: none; border-radius: 6px; font-weight: bold;">상세 정보 보기</button>
                </div>
              `;

              const overlay = new window.kakao.maps.CustomOverlay({
                content,
                position: marker.getPosition(),
                yAnchor: 1.4,
              });
              overlay.setMap(map);
              currentOverlay = overlay;

              setTimeout(() => {
                const btn = document.getElementById(`btn-${item.gatheringPostId}`);
                if (btn) {
                  btn.onclick = () => navigate(`/meeting/${item.gatheringPostId}`);
                }
              }, 0);
            } catch (err) {
              console.error("❌ 상세 데이터 로드 실패", err);
            }
          });
        });

        // ✅ 지도 렌더링 완료 후 로딩 종료
        if (typeof onMapLoaded === "function") {
          onMapLoaded();
        }

      } catch (err) {
        console.error("❌ 지도 렌더링 중 오류 발생", err);
        if (typeof onMapLoaded === "function") {
          onMapLoaded(); // 실패하더라도 반드시 로딩 종료
        }
      }
    };

    renderMap();
  }, [meetups, userPosition]);

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
