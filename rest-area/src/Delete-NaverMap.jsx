import React, { useEffect, useRef } from 'react';

const NaverMap = () => {
  const mapElement = useRef(null);

  useEffect(() => {
    // Vite 환경 변수에서 클라이언트 ID 가져오기
    const naverClientId = import.meta.env.VITE_NAVER_CLIENT_ID;

    // 클라이언트 ID가 없다면 스크립트를 로드하지 않음
    if (!naverClientId) {
      console.error("Naver Client ID가 .env 파일에 설정되지 않았습니다.");
      return;
    }

    // 스크립트 동적 로딩
    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${naverClientId}`;
    script.async = true;
    
    // 스크립트 로드가 완료되면 지도를 초기화하는 콜백 함수 등록
    script.onload = () => {
      if (window.naver && window.naver.maps) {
        if (!mapElement.current) return;

        const mapOptions = {
          center: new window.naver.maps.LatLng(37.5666102, 126.9783881),
          zoom: 10,
        };

        // 지도 생성
        new window.naver.maps.Map(mapElement.current, mapOptions);
      } else {
        console.error("Naver Maps API 스크립트는 로드되었으나, naver.maps 객체를 찾을 수 없습니다.");
      }
    };

    // 스크립트 로드 중 에러 발생 시
    script.onerror = () => {
      console.error("Naver Maps API 스크립트를 로드하는 중 에러가 발생했습니다.");
    };

    document.head.appendChild(script);

  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return (
    <div ref={mapElement} style={{ width: '100%', height: '400px' }} />
  );
};

export default NaverMap;