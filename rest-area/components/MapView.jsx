
import React from 'react';
import { MapPinIcon } from './icons/MapPinIcon.jsx';

export const MapView = () => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <MapPinIcon className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold ml-3 text-gray-800">지도</h1>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <p className="text-lg text-gray-600">지도 기능은 현재 준비 중입니다.</p>
        <p className="text-gray-400 mt-2">곧 경로와 휴게소 위치를 한눈에 볼 수 있는 지도를 제공할 예정입니다.</p>
      </div>
    </div>
  );
};