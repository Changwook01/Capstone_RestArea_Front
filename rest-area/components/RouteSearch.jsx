
import React from 'react';
import { RouteIcon } from './icons/RouteIcon.jsx';

const PresetButton = ({ origin, destination, onClick }) => (
    <button
        onClick={() => onClick(origin, destination)}
        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
    >
        {origin} → {destination}
    </button>
);

export const RouteSearch = ({ origin, setOrigin, destination, setDestination, onSearch, onPresetSearch }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
      <div className="flex items-center mb-6">
        <RouteIcon className="w-7 h-7 text-blue-500" />
        <h2 className="text-xl font-bold ml-3 text-gray-800">경로 검색</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="origin" className="block text-sm font-medium text-gray-500 mb-1">출발지</label>
          <input
            type="text"
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="예: 서울"
            className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition"
          />
        </div>
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-500 mb-1">목적지</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="예: 부산"
            className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition"
          />
        </div>
      </div>

      <button
        onClick={onSearch}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-4 rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-lg"
      >
        <span className="mr-2">경로 검색</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>

      <div className="mt-6">
        <p className="text-sm font-medium text-gray-500 mb-3 text-center">빠른 설정</p>
        <div className="flex flex-wrap gap-2 justify-center">
            <PresetButton origin="서울" destination="부산" onClick={onPresetSearch} />
            <PresetButton origin="서울" destination="대전" onClick={onPresetSearch} />
            <PresetButton origin="대구" destination="서울" onClick={onPresetSearch} />
        </div>
      </div>
    </div>
  );
};