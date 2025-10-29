import React, { useEffect, useRef } from 'react';

const KakaoMap = () => {
  const mapElement = useRef(null);

  useEffect(() => {
    const kakaoAppKey = import.meta.env.VITE_KAKAO_APP_KEY;
    if (!kakaoAppKey) {
      console.error("Kakao App Key가 .env 파일에 설정되지 않았습니다.");
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoAppKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      // 스크립트 로드가 완료되면, 지도 서비스를 로드합니다.
      window.kakao.maps.load(() => {
        // 이 콜백 함수 안에서는 window.kakao.maps의 모든 기능을 사용할 수 있습니다.
        if (!mapElement.current) return;

        // ✅ 지도 생성 코드를 모두 이 안으로 이동
        const mapOptions = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        
        new window.kakao.maps.Map(mapElement.current, mapOptions);
      });
    };
    
    script.onerror = () => {
      console.error("Kakao Maps API 스크립트를 로드하는 중 에러가 발생했습니다.");
    };

    document.head.appendChild(script);

  }, []);

  return (
    <div ref={mapElement} style={{ width: '500px', height: '400px' }} />
  );
};

export default KakaoMap;