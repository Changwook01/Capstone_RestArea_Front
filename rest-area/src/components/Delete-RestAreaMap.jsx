import React, { useEffect, useRef, useState } from 'react';

export const RestAreaMap = ({ restAreas = [], onSelectRestArea, selectedRestArea }) => {
  const mapElement = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const kakaoAppKey = import.meta.env.VITE_KAKAO_APP_KEY;
    if (!kakaoAppKey) return console.error("Kakao App Key가 .env에 없습니다.");

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoAppKey}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapElement.current) return;
        const mapOptions = {
          center: new window.kakao.maps.LatLng(36.5, 127.5),
          level: 12,
        };
        const mapInstance = new window.kakao.maps.Map(mapElement.current, mapOptions);
        setMap(mapInstance);
      });
    };
  }, []);

  useEffect(() => {
    if (!map || !window.kakao) return;

    // 기존 마커 제거
    markers.forEach(marker => marker.setMap(null));

    // 새 마커 생성
    const newMarkers = restAreas.map(area => {
      if (!area.latitude || !area.longitude) return null;
      
      const markerPosition = new window.kakao.maps.LatLng(area.latitude, area.longitude);
      const isSelected = selectedRestArea?.restAreaId === area.restAreaId;

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        title: area.name,
      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        onSelectRestArea(area);
        map.panTo(markerPosition);
      });
      
      return marker;
    }).filter(marker => marker !== null);

    newMarkers.forEach(marker => marker.setMap(map));
    setMarkers(newMarkers);

  }, [map, restAreas, selectedRestArea]);

  return <div ref={mapElement} style={{ width: '100%', height: '600px' }} />;
};