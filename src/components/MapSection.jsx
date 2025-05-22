import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;

function MapSection() {
  const navigate = useNavigate();
  const token = localStorage.getItem("kakao_token");

  const [meetups, setMeetups] = useState([]);
  const [userPosition, setUserPosition] = useState({
    lat: 37.5665,
    lng: 126.978,
  });

  // ✅ 1. 사용자 주소 기반 위치 설정
  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const res = await fetch(`${BACKEND_API_URL}/member/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        const address = data.detailAddress;

        if (address && address.trim() !== "") {
          // Kakao Geocoder 로딩
          const script = document.createElement("script");
          script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false&libraries=services`;
          script.async = true;
          document.head.appendChild(script);

          script.onload = () => {
            window.kakao.maps.load(() => {
              const geocoder = new window.kakao.maps.services.Geocoder();
              geocoder.addressSearch(address, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
                  setUserPosition({
                    lat: parseFloat(result[0].y),
                    lng: parseFloat(result[0].x),
                  });
                } else {
                  console.warn("주소 → 좌표 변환 실패, GPS fallback");
                  fallbackToGPS();
                }
              });
            });
          };
        } else {
          console.warn("detailAddress 없음, GPS fallback");
          fallbackToGPS();
        }
      } catch (e) {
        console.warn("사용자 정보 요청 실패:", e);
        fallbackToGPS();
      }
    };

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
            setUserPosition({ lat: 37.5665, lng: 126.978 }); // 서울 시청
          }
        );
      } else {
        setUserPosition({ lat: 37.5665, lng: 126.978 });
      }
    };

    fetchUserAddress();
  }, [token]);

  // ✅ 2. 모집 글 불러오기
  useEffect(() => {
    const fetchMeetups = async () => {
      const { lat, lng } = userPosition;

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
  }, [userPosition, token]);

  // ✅ 3. 지도 생성 및 마커/오버레이
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(userPosition.lat, userPosition.lng),
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

          window.kakao.maps.event.addListener(marker, "click", async () => {
            if (currentOverlay) currentOverlay.setMap(null);

            try {
              const res = await fetch(`${BACKEND_API_URL}/gathering/${item.gatheringPostId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              const detail = await res.json();

              const endDate = new Date(detail.gatheringEndTime);
              const endMonth = endDate.getMonth() + 1;
              const endDay = endDate.getDate();

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
            } catch (err) {
              console.error("상세 정보 요청 실패:", err);
            }
          });
        });
      });
    };

    return () => {
      const existing = document.querySelector('script[src*="dapi.kakao.com"]');
      if (existing) document.head.removeChild(existing);
    };
  }, [meetups, navigate, token, userPosition]);

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
