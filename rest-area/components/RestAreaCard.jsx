
import React, { useState, useCallback } from 'react';
import { Amenity } from '../types.js';
import { fetchFoodRecommendations } from '../services/geminiService.js';
import { SparklesIcon } from './icons/SparklesIcon.jsx';
import { HeartIcon } from './icons/HeartIcon.jsx';
import { MapPinIcon } from './icons/MapPinIcon.jsx';

const amenityColors = {
  [Amenity.GasStation]: 'bg-orange-100 text-orange-800 border-orange-200',
  [Amenity.LPGStation]: 'bg-red-100 text-red-800 border-red-200',
  [Amenity.EVStation]: 'bg-green-100 text-green-800 border-green-200',
  [Amenity.ConvenienceStore]: 'bg-sky-100 text-sky-800 border-sky-200',
  [Amenity.Restaurant]: 'bg-amber-100 text-amber-800 border-amber-200',
  [Amenity.Cafe]: 'bg-purple-100 text-purple-800 border-purple-200',
  [Amenity.Pharmacy]: 'bg-teal-100 text-teal-800 border-teal-200',
  [Amenity.SleepingRoom]: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  [Amenity.ShowerRoom]: 'bg-cyan-100 text-cyan-800 border-cyan-200',
};

// This number is chosen to roughly fit 2 lines on a medium-sized card.
const INITIAL_AMENITIES_LIMIT = 8;

export const RestAreaCard = ({ restArea, index, isFavorite, onToggleFavorite, size = 'full', className = '' }) => {
  const [recommendations, setRecommendations] = useState(null);
  const [isFetchingRecs, setIsFetchingRecs] = useState(false);
  const [error, setError] = useState(null);
  const [amenitiesExpanded, setAmenitiesExpanded] = useState(false);

  const getRecommendations = useCallback(async () => {
    setIsFetchingRecs(true);
    setError(null);
    setRecommendations(null);
    try {
      const result = await fetchFoodRecommendations(restArea.name, restArea.direction, restArea.highway);
      setRecommendations(result);
    } catch (e) {
      setError('추천 메뉴를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
      console.error(e);
    } finally {
      setIsFetchingRecs(false);
    }
  }, [restArea.name, restArea.direction, restArea.highway]);

  const timeHours = Math.floor(restArea.timeMinutes / 60);
  const timeMins = restArea.timeMinutes % 60;
  
  const visibleAmenities = amenitiesExpanded 
    ? restArea.amenities 
    : restArea.amenities.slice(0, INITIAL_AMENITIES_LIMIT);

  const hiddenAmenitiesCount = restArea.amenities.length - visibleAmenities.length;

  return (
    <div className={`bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:border-blue-300 border border-transparent relative ${className}`}>
      <button 
        onClick={onToggleFavorite} 
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-100 transition-colors z-10"
        aria-label={isFavorite ? '즐겨찾기에서 제거' : '즐겨찾기에 추가'}
      >
        <HeartIcon className={`w-6 h-6 transition-all duration-200 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-400'}`} />
      </button>

      <div className="flex flex-row items-start gap-4">
        <div className="flex-shrink-0 flex items-center justify-center bg-blue-100 text-blue-600 w-12 h-12 rounded-full font-bold text-xl">
          {index ? index : <MapPinIcon className="w-6 h-6" />}
        </div>
        <div className="flex-grow min-w-0">
          {/* Row 1: Name and Button */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-grow min-w-0 md:pr-4">
              <h4 className="text-xl font-bold text-gray-900 min-h-[3.5rem] flex items-center leading-tight">
                <span>{restArea.name} ({restArea.direction})</span>
              </h4>
              <p className="text-sm text-gray-500">{restArea.highway}</p>
              {index > 0 && (
                <div className="flex items-center space-x-4 text-sm text-blue-700 font-semibold mt-1">
                    <span>{restArea.distanceKm}km</span>
                    <span>약 {timeHours > 0 && `${timeHours}시간 `}{timeMins}분 후</span>
                </div>
              )}
            </div>
            <div className={`w-full ${size === 'compact' ? 'md:w-28' : 'md:w-44'} flex-shrink-0`}>
              <button
                onClick={getRecommendations}
                disabled={isFetchingRecs}
                className="w-full min-h-[3.25rem] flex items-center justify-center text-center px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-200"
              >
                <SparklesIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>{size === 'compact' ? 'AI 메뉴 추천' : 'AI 인기 메뉴 추천'}</span>
              </button>
            </div>
          </div>
          
          {/* Row 2: Amenities */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {visibleAmenities.map(amenity => (
              <div key={amenity} className={`px-2.5 py-1 rounded-full text-xs font-medium border ${amenityColors[amenity] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                {amenity}
              </div>
            ))}
            {hiddenAmenitiesCount > 0 && !amenitiesExpanded && (
              <button
                onClick={() => setAmenitiesExpanded(true)}
                className="px-2.5 py-1 bg-gray-200 text-gray-800 rounded-full text-xs font-medium hover:bg-gray-300 transition-colors border border-gray-300"
                aria-label={`${hiddenAmenitiesCount}개 편의시설 더 보기`}
              >
                +{hiddenAmenitiesCount}
              </button>
            )}
           </div>
        </div>
      </div>
      
      {isFetchingRecs && <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center text-gray-600 animate-pulse">AI가 열심히 메뉴를 찾고 있습니다...</div>}
      {error && <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>}
      
      {recommendations && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h5 className="font-bold text-md text-gray-800 mb-3">✨ Gemini AI 추천 메뉴</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200">
                <p className="font-bold text-blue-800">{item.name}</p>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};