import React from 'react';
import { Header } from './components/Header';
import { RouteSearch } from './components/RouteSearch';
import { WeatherTrafficInfo } from './components/WeatherTrafficInfo';
import { RestAreaMap } from './components/RestAreaMap';
import { RestAreaCard } from './components/RestAreaCard';
import { RestAreaSearchFilters } from './components/RestAreaSearchFilters';
// import { RecommendationEngine } from './components/RecommendationEngine';
// import { SearchFilters } from './components/SearchFilters';
// import { MenuCard } from './components/MenuCard';
// import { ReviewList } from './components/ReviewList';
// import { LoginForm } from './components/LoginForm';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Heart, MapPin, Utensils, Route, Sparkles, Search } from 'lucide-react';

import {
  mockRestAreas,
  mockMenus,
  mockReviews,
} from './data/mockData';

import {
  getFavorites,
  getCurrentUser,
  getSearchHistory,
  addToSearchHistory,
  addToRecentRestAreas,
} from './utils/storage';

// Zustand 스토어 import (activeTab 상태를 전역으로 관리)
import useAppStore from './stores/appStore';

export default function App() {
  // Zustand 스토어에서 탭 상태와 탭 변경 함수를 가져옵니다.
  const { activeTab, setActiveTab } = useAppStore();

  // 탭 변경 외의 UI 상태는 App.jsx에서 'useState'로 관리합니다.
  const [selectedRestArea, setSelectedRestArea] = React.useState(null);
  // 1. '메뉴 검색'용으로 이름 변경
  const [menuSearchFilters, setMenuSearchFilters] = React.useState({});
  // 이 state는 빈 배열( [] )로 시작
  const [menuSearchResults, setMenuSearchResults] = React.useState([]);
  
  // 2. '휴게소 검색'용 state 새로 추가 (이것이 에러를 고칩니다)
  const [restAreaSearchFilters, setRestAreaSearchFilters] = React.useState({});
  const [restAreaSearchResults, setRestAreaSearchResults] = React.useState([]);

  const [favorites, setFavorites] = React.useState(getFavorites());
  const [routeRestAreas, setRouteRestAreas] = React.useState([]);
  
  const currentUser = getCurrentUser();

  // 검색 실행
  // 1. 기존 '메뉴 검색' 함수 -> handleMenuSearch로 이름 변경
  const handleMenuSearch = () => {
    let results = [...mockMenus];
    // menuSearchFilters와 setMenuSearchResults를 사용하도록 수정
    if (menuSearchFilters.keyword) { 
      const keyword = menuSearchFilters.keyword.toLowerCase();
      results = results.filter(
        (menu) =>
          menu.name.toLowerCase().includes(keyword) ||
          menu.description.toLowerCase().includes(keyword),
      );
      addToSearchHistory(menuSearchFilters.keyword);
    }
    setMenuSearchResults(results); 
  };
  //페이지 로드 시 (useEffect)
  React.useEffect(() => {
    
    // 'search' 탭이 아니면 데이터를 불러오지 않음 (최적화)
    if (activeTab !== 'search') {
      return; 
    }

    const fetchAllRestAreas = async () => {
      try {
        // 1. 백엔드의 '전체 조회' API 호출 (초기 목록용)
        const response = await fetch('http://localhost:8080/api/rest-areas');
        
        if (!response.ok) {
          throw new Error('초기 휴게소 목록을 가져오는 데 실패했습니다.');
        }
        
        const data = await response.json();
        
        // 2. 백엔드에서 받은 실제 데이터로 state 업데이트
        setRestAreaSearchResults(data);

      } catch (error) {
        console.error("초기 데이터 로드 에러:", error);
      }
    };
    
    // 함수 실행
    fetchAllRestAreas();
    
  }, [activeTab]); // activeTab이 바뀔 때마다 이 코드를 다시 검사합니다.

  // 2. '휴게소 검색'용 함수 새로 추가, 검색 버튼 클릭 시
  // const handleRestAreaSearch = () => {
  //   console.log("휴게소 검색 실행:", restAreaSearchFilters);
    
  //   let results = [...mockRestAreas]; // 검색 대상을 mockRestAreas로

  //   // 키워드 필터 (휴게소 이름)
  //   if (restAreaSearchFilters.keyword) {
  //     const keyword = restAreaSearchFilters.keyword.toLowerCase();
  //     results = results.filter(
  //       (area) => area.name.toLowerCase().includes(keyword)
  //     );
  //     addToSearchHistory(restAreaSearchFilters.keyword);
  //   }
    
  //   // 노선 필터
  //   if (restAreaSearchFilters.routeName) {
  //       results = results.filter(
  //         (area) => area.routeName === restAreaSearchFilters.routeName
  //       );
  //   }
    
  //   // 편의시설 필터
  //   if (restAreaSearchFilters.facilities && restAreaSearchFilters.facilities.length > 0) {
  //       results = results.filter((area) => 
  //           area.facilities && 
  //           restAreaSearchFilters.facilities.every(facility => 
  //               area.facilities.includes(facility)
  //           )
  //       );
  //   }

  //   setRestAreaSearchResults(results); // '휴게소 검색' 결과 State에 저장
    
  // };

  const handleRestAreaSearch = async () => {
    console.log("!!!!!!!!!! 검색 버튼 클릭됨 !!!!!!!!!!");
    console.log("현재 검색 필터:", restAreaSearchFilters);
    console.log("백엔드에 검색 요청:", restAreaSearchFilters);
    
    const keyword = restAreaSearchFilters.keyword || ""; // 키워드가 없으면 빈 문자열

    try {
      // 1. URLSearchParams를 사용해 쿼리 스트링 생성
      const queryParams = new URLSearchParams({ keyword: keyword });
      
      // (나중에 routeName 필터가 추가되면 이렇게 덧붙이면 됩니다)
      // if (restAreaSearchFilters.routeName) {
      //   queryParams.append('routeName', restAreaSearchFilters.routeName);
      // }

      // 2. 백엔드의 '검색' API 호출
      const response = await fetch(
        `http://localhost:8080/api/rest-areas/search?${queryParams}`
      );

      if (!response.ok) {
        throw new Error('검색 결과를 가져오는 데 실패했습니다.');
      }

      const data = await response.json();
      
      // 3. 백엔드에서 받은 *검색 결과* 데이터로 state 업데이트
      setRestAreaSearchResults(data);

    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
      setRestAreaSearchResults([]); // 에러 시 목록 비우기
    }
  };


  // 휴게소 선택
  const handleSelectRestArea = (restArea) => {
    setSelectedRestArea(restArea);
    addToRecentRestAreas(restArea.restAreaId);
    setActiveTab('restarea-detail'); // '휴게소 상세' 탭으로 변경
  };

  // 메뉴 선택
  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
    setActiveTab('menu-detail'); // '메뉴 상세' 탭으로 변경
  };

  // 즐겨찾기 목록 업데이트 (LocalStorage 변경 감지)
  React.useEffect(() => {
    const updateFavorites = () => setFavorites(getFavorites());
    window.addEventListener('storage', updateFavorites);
    return () => window.removeEventListener('storage', updateFavorites);
  }, []);

  // 메인 컨텐츠 렌더링
  const renderMainContent = () => {
    // 로그인이 필요한 탭에 접근 시 'login' 탭으로 강제 이동
    if (!currentUser && (activeTab === 'favorites' || activeTab === 'operator')) {
      return (
        <div className="max-w-md mx-auto">
          <LoginForm onLoginSuccess={() => setActiveTab('route')} />
        </div>
      );
    }

    switch (activeTab) {
      case 'route':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Route className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold">경로 검색</h2>
            </div>
            {/* 경로 검색 결과(restAreas)를 'setRouteRestAreas'를 통해 App 상태로 업데이트 */}
            <RouteSearch onRouteRestAreas={setRouteRestAreas} />
            {routeRestAreas.length > 0 && (
              <WeatherTrafficInfo
                restAreas={routeRestAreas}
                onRestAreaSelect={handleSelectRestArea}
              />
            )}
          </div>
        );

      case 'map':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold">주변 휴게소</h2>
            </div>
            <RestAreaMap
              restAreas={mockRestAreas}
              onSelectRestArea={handleSelectRestArea}
              selectedRestArea={selectedRestArea}
              title="주변 휴게소 목록"
            />
          </div>
        );

      case 'recommendations':
        return (
          <div className="space-y-6">
            <RecommendationEngine
              onMenuClick={handleSelectMenu}
              onRestAreaClick={handleSelectRestArea}
            />
          </div>
        );

      case 'search':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold">휴게소 검색</h2>
            </div>
            
            <RestAreaSearchFilters
              filters={restAreaSearchFilters}
              onFiltersChange={setRestAreaSearchFilters}
              onSearch={handleRestAreaSearch} // <-- (📍 fetch 2번이 여기서 연결됨)
              searchHistory={getSearchHistory()}
            />
            
            <RestAreaMap
              // (📍 fetch 1번 또는 2번으로 채워진 state가 여기에 전달됨)
              // (❌ mockRestAreas를 사용하던 부분 삭제)
              restAreas={restAreaSearchResults} 
              onSelectRestArea={handleSelectRestArea}
              onMenuSelect={handleSelectMenu} 
              selectedRestArea={selectedRestArea}
              title="인기 휴게소 목록"
            />
          </div>
          // <div className="space-y-6">
          //   <div className="flex items-center gap-2 mb-4">
          //     <Search className="w-5 h-5 text-blue-600" />
          //     <h2 className="text-xl font-semibold">휴게소 검색</h2>
          //   </div>
            
          //   <RestAreaSearchFilters
          //     filters={restAreaSearchFilters}
          //     onFiltersChange={setRestAreaSearchFilters}
          //     onSearch={handleRestAreaSearch}
          //     searchHistory={getSearchHistory()}
          //   />
            
          //   <RestAreaMap
          //     restAreas={restAreaSearchResults.length > 0 ? restAreaSearchResults : mockRestAreas}
          //     onSelectRestArea={handleSelectRestArea}
          //     onMenuSelect={handleSelectMenu} 
          //     selectedRestArea={selectedRestArea}
          //   />
          // </div>

          // <div className="space-y-6">
          //   <div className="flex items-center gap-2 mb-4">
          //     <Utensils className="w-5 h-5 text-blue-600" />
          //     <h2 className="text-xl font-semibold">메뉴 검색</h2>
          //   </div>
          //   <SearchFilters
          //     filters={searchFilters}
          //     onFiltersChange={setSearchFilters}
          //     onSearch={handleSearch}
          //     searchHistory={getSearchHistory()}
          //   />
          //   {/* 검색 결과가 있거나, 검색어가 있을 때 */}
          //   {searchResults.length > 0 || searchFilters.keyword ? (
          //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          //       {searchResults.map((menu) => (
          //         <MenuCard
          //           key={menu.menuId}
          //           menu={menu}
          //           onMenuClick={handleSelectMenu}
          //           showRestAreaName={true}
          //         />
          //       ))}
          //     </div>
          //   ) : (
          //     // 초기 인기 메뉴
          //     <div>
          //       <h3 className="text-lg font-medium mb-4">인기 메뉴</h3>
          //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          //         {mockMenus.slice(0, 9).map((menu) => (
          //           <MenuCard
          //             key={menu.menuId}
          //             menu={menu}
          //             onMenuClick={handleSelectMenu}
          //             showRestAreaName={true}
          //           />
          //         ))}
          //       </div>
          //     </div>
          //   )}
          // </div>
        );

      case 'favorites':
        const favoriteMenus = mockMenus.filter((menu) =>
          favorites.includes(menu.menuId),
        );
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-semibold">즐겨찾기</h2>
              <Badge variant="secondary">{favoriteMenus.length}</Badge>
            </div>
            {favoriteMenus.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteMenus.map((menu) => (
                  <MenuCard
                    key={menu.menuId}
                    menu={menu}
                    onMenuClick={handleSelectMenu}
                    showRestAreaName={true}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">즐겨찾기한 메뉴가 없습니다.</p>
                </CardContent>
              </Card>
            )}
          </div>
        );
      
      // --- 상세 페이지들 ---
      case 'restarea-detail':
        if (!selectedRestArea) return null; // 선택된 휴게소가 없으면 렌더링 안함
        const restAreaMenus = mockMenus.filter(
          (menu) => menu.restAreaId === selectedRestArea.restAreaId,
        );
        return (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setActiveTab('route')}>
              ← 뒤로가기
            </Button>
            <h2 className="text-2xl font-bold">{selectedRestArea.name}</h2>
            {/* ... (휴게소 상세 정보 카드) ... */}
            <h3 className="text-xl font-semibold">휴게소 메뉴</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restAreaMenus.map((menu) => (
                <MenuCard
                  key={menu.menuId}
                  menu={menu}
                  onMenuClick={handleSelectMenu}
                  showRestAreaName={false}
                />
              ))}
            </div>
          </div>
        );

      case 'menu-detail':
        if (!selectedMenu) return null; // 선택된 메뉴가 없으면 렌더링 안함
        const menuReviews = mockReviews.filter(
          (review) => review.menuId === selectedMenu.menuId,
        );
        return (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setActiveTab('search')}>
              ← 뒤로가기
            </Button>
            <MenuCard
              menu={selectedMenu}
              onMenuClick={() => {}}
              showRestAreaName={true}
              detailed={true}
            />
            <ReviewList reviews={menuReviews} currentUser={currentUser} />
          </div>
        );

      case 'login':
        return (
          <div className="max-w-md mx-auto">
            <LoginForm onLoginSuccess={() => setActiveTab('route')} />
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <RouteSearch onRouteRestAreas={setRouteRestAreas} />
          </div>
        );
    }
  };

  return (
    // Bootstrap의 'style=' 대신 Tailwind의 className을 사용합니다.
    <div className="min-h-screen bg-gray-50">
      {/* Header는 Zustand 스토어에서 activeTab과 setActiveTab을 직접 가져다 씁니다.
        (이전 답변에서 Header.jsx를 그렇게 수정했습니다.)
      */}
      <Header favoriteCount={favorites.length} />

      {/*
        !!! 가장 중요한 수정 !!!
        Bootstrap의 <Container>를 삭제하고,
        Tailwind CSS의 레이아웃 클래스를 사용한 <main> 태그로 변경합니다.
        - "container": max-width를 설정
        - "mx-auto": 가운데 정렬
        - "max-w-7xl": 최대 너비를 1280px로 제한 (디자인과 유사하게)
        - "px-4 py-6": 좌우, 상하 패딩
      */}
      <main className="container mx-auto max-w-7xl px-4 py-6">
        {renderMainContent()}
      </main>
    </div>
  );
}