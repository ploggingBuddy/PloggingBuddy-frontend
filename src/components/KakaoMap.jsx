import React, { useEffect } from "react";

const KakaoMap = () => {
  useEffect(() => {
    // 기존 스크립트가 중복으로 로드되지 않도록 새 스크립트 태그 생성
    const script = document.createElement("script");
    // autoload=false를 설정하면, 로드 후 kakao.maps.load()를 호출해 지도 초기화를 할 수 있습니다.

    const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;
    //kakaoapi

    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // SDK가 로드되면, kakao.maps.load()를 사용하여 지도를 초기화
      window.kakao.maps.load(() => {
        const container = document.getElementById("map"); // 지도를 표시할 <div>의 id
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3, // 지도의 확대 레벨
        };
        new window.kakao.maps.Map(container, options);
      });
    };

    // 컴포넌트 언마운트 시 스크립트 정리
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};

export default KakaoMap;
