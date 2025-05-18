import React, { useEffect } from "react";

const MapModal = ({ onClose, onSelect }) => {
  useEffect(() => {
    const script = document.createElement("script");

    const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;
    //kakao API
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
          const latlng = mouseEvent.latLng;
          const result = `위도: ${latlng.getLat()}, 경도: ${latlng.getLng()}`;

          // 부모 컴포넌트로 전달
          onSelect(result);
          onClose(); // 모달 닫기
        });
      });
    };

    return () => {
      const existing = document.querySelector('script[src*="dapi.kakao.com"]');
      if (existing) document.head.removeChild(existing);
    };
  }, [onSelect, onClose]);

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
            backgroundColor: "#eee",
            padding: "12px 20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
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
