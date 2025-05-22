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
        console.log("📍 renderMap 실행됨");
        await loadKakaoSDK();

        const container = document.getElementById("map");
        if (!container) {
          console.warn("❗ map container 없음");
          onMapLoaded?.();
          return;
        }

        const map = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(userPosition.lat, userPosition.lng),
          level: 5,
        });

        console.log("🗺️ 지도 생성 완료");
        onMapLoaded?.(); // ✅ 반드시 호출
        console.log("✅ onMapLoaded 호출 완료");
      } catch (err) {
        console.error("❌ 지도 렌더링 실패", err);
        onMapLoaded?.();
      }
    };

    renderMap();
  }, [userPosition]); // ✅ meetups 제거로 무한 로딩 방지

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
