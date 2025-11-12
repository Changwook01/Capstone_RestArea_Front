
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header.jsx';
import { RouteSearch } from './components/RouteSearch.jsx';
import { SearchResults } from './components/SearchResults.jsx';
import { Amenity } from './types.js';
import { CarIcon } from './components/icons/CarIcon.jsx';
import { MapView } from './components/MapView.jsx';
import { RestAreaSearchView } from './components/RestAreaSearchView.jsx';
import { FavoritesView } from './components/FavoritesView.jsx';
import { ALL_REST_AREAS } from './data/restAreas.js';


const mockRestAreas = [
  {
    id: 1,
    name: '안성휴게소',
    direction: '서울방향',
    highway: '경부고속도로',
    distanceKm: 45,
    timeMinutes: 40,
    amenities: [Amenity.GasStation, Amenity.EVStation, Amenity.ConvenienceStore, Amenity.Pharmacy, Amenity.Cafe],
  },
  {
    id: 2,
    name: '천안휴게소',
    direction: '서울방향',
    highway: '경부고속도로',
    distanceKm: 85,
    timeMinutes: 80,
    amenities: [Amenity.GasStation, Amenity.LPGStation, Amenity.ConvenienceStore, Amenity.Restaurant],
  },
  {
    id: 3,
    name: '옥천휴게소',
    direction: '서울방향',
    highway: '경부고속도로',
    distanceKm: 120,
    timeMinutes: 110,
    amenities: [Amenity.GasStation, Amenity.EVStation, Amenity.ConvenienceStore, Amenity.SleepingRoom, Amenity.ShowerRoom],
  },
];

const mockRoute = {
  totalDistanceKm: 195,
  totalTimeMinutes: 150,
  restAreas: mockRestAreas,
};

const App = () => {
  const [origin, setOrigin] = useState('서울');
  const [destination, setDestination] = useState('부산');
  const [route, setRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState('route');
  const [favorites, setFavorites] = useState([1, 3]);

  const handleSearch = useCallback(() => {
    if (!origin || !destination) {
      alert('출발지와 목적지를 모두 입력해주세요.');
      return;
    }
    setIsLoading(true);
    setRoute(null);
    setTimeout(() => {
      setRoute(mockRoute);
      setIsLoading(false);
    }, 1500);
  }, [origin, destination]);
  
  const handlePresetSearch = useCallback((newOrigin, newDestination) => {
    setOrigin(newOrigin);
    setDestination(newDestination);
    setIsLoading(true);
    setRoute(null);
    setTimeout(() => {
      setRoute(mockRoute);
      setIsLoading(false);
    }, 1500);
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  }, []);

  const favoritedRestAreas = ALL_REST_AREAS.filter(area => favorites.includes(area.id));

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        {activeView === 'route' && (
          <>
            <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-2">
              AI와 함께 찾는 고속도로 휴게소 맛집
            </h1>
            <p className="text-center text-gray-500 mb-8">
              경로를 검색하고 Gemini AI에게 휴게소별 인기 메뉴를 추천받아보세요!
            </p>

            <RouteSearch
              origin={origin}
              setOrigin={setOrigin}
              destination={destination}
              setDestination={setDestination}
              onSearch={handleSearch}
              onPresetSearch={handlePresetSearch}
            />

            {isLoading && (
              <div className="flex flex-col items-center justify-center mt-12 text-blue-600">
                <CarIcon className="w-16 h-16 animate-bounce" />
                <p className="mt-4 text-lg font-semibold">경로를 검색하고 있습니다...</p>
              </div>
            )}
            
            {route && !isLoading && <SearchResults route={route} favorites={favorites} onToggleFavorite={toggleFavorite} />}
          </>
        )}
        {activeView === 'map' && <MapView />}
        {activeView === 'search' && <RestAreaSearchView allRestAreas={ALL_REST_AREAS} favorites={favorites} onToggleFavorite={toggleFavorite} />}
        {activeView === 'favorites' && <FavoritesView favoriteRestAreas={favoritedRestAreas} favorites={favorites} onToggleFavorite={toggleFavorite} />}

      </main>
      <footer className="text-center py-6 text-sm text-gray-400">
        © 2024 AI 휴게소 맛집 찾기. All Rights Reserved.
      </footer>
    </div>
  );
};

export default App;