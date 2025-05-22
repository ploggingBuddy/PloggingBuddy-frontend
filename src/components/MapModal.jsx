import React, { useEffect, useState } from "react";

const MapModal = ({ onClose, onSelect }) => {
  const [userPosition, setUserPosition] = useState(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;

  // ✅ 사용자 GPS 위치 요청
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.warn("위치 권한 거부됨, 기본 위치 사용");
        setUserPosition({ lat: 37.5665, lng: 126.978 }); // 서울 시청
      }
    );
  }, []);

  // ✅ 지도 스크립트 로딩 및 지도 렌더링 (위치 정보가 있어야 실행)
  useEffect(() => {
    if (!userPosition || isMapInitialized) return;

    const loadMap = async () => {
      if (!document.querySelector('script[src*="dapi.kakao.com"]')) {
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false&libraries=services`;
        script.async = true;
        document.head.appendChild(script);
        await new Promise((resolve) => (script.onload = resolve));
      }

      await new Promise((resolve) => {
        const check = () => {
          if (
            window.kakao &&
            window.kakao.maps &&
            window.kakao.maps.services
          ) {
            resolve();
          } else {
            setTimeout(check, 50);
          }
        };
        check();
      });

      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        if (!container) return;

        const mapOption = {
          center: new window.kakao.maps.LatLng(
            userPosition.lat,
            userPosition.lng
          ),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, mapOption);
        const geocoder = new window.kakao.maps.services.Geocoder();

        window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
          const lat = mouseEvent.latLng.getLat();
          const lng = mouseEvent.latLng.getLng();

          geocoder.coord2Address(lng, lat, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = result[0].address.address_name;
              console.log("📍 선택된 주소:", address);

              onSelect({
                latlng: { lat, lng },
                addressText: address,
              });

              onClose();
            } else {
              alert("주소를 불러올 수 없습니다.");
            }
          });
        });

        setIsMapInitialized(true);
      });
    };

    loadMap();

    return () => {
      const container = document.getElementById("map");
      if (container) container.innerHTML = "";
    };
  }, [userPosition, isMapInitialized]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: "80%",
          height: "60%",
          backgroundColor: "white",
          borderRadius: "10px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div id="map" style={{ flex: 1 }} />
        <div
          style={{
            padding: "12px 20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#6DBE45",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
