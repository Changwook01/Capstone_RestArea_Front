import { mockRestAreas, mockMenus } from '../data/mockData';
import { getCurrentUser, getSearchHistory, getFavorites, getRecentRestAreas } from './storage';

// 사용자 선호도 분석 기반 휴게소 추천
// --- (restAreas: RestArea[], limit = 3): RestArea[]  => (restAreas, limit = 3)
export const getPersonalizedRestAreaRecommendations = (restAreas, limit = 3) => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    // 로그인하지 않은 경우 기본 추천 (평점 높은 휴게소 순)
    return getPopularRestAreas(restAreas, limit);
  }

  const searchHistory = getSearchHistory();
  const favorites = getFavorites();
  const recentRestAreas = getRecentRestAreas();

  // 선호도 점수 계산
  const scoredRestAreas = restAreas.map(restArea => {
    let score = 0;
    
    // 최근 방문한 휴게소와 같은 고속도로인 경우 가점
    const recentVisitedRestAreas = mockRestAreas.filter(ra => 
      recentRestAreas.includes(ra.restAreaId)
    );
    if (recentVisitedRestAreas.some(ra => ra.routeName === restArea.routeName)) {
      score += 20;
    }

    // 휴게소 메뉴들의 평균 평점
    const restAreaMenus = mockMenus.filter(menu => menu.restAreaId === restArea.restAreaId);
    const avgRating = restAreaMenus.reduce((sum, menu) => sum + (menu.averageRating || 0), 0) / restAreaMenus.length;
    score += (avgRating || 0) * 10;

    // 즐겨찾기한 메뉴가 있는 휴게소인 경우 가점
    const hasFavoriteMenu = restAreaMenus.some(menu => favorites.includes(menu.menuId));
    if (hasFavoriteMenu) {
      score += 30;
    }

    // 검색 히스토리와 매칭되는 메뉴가 있는 경우 가점
    const searchKeywords = searchHistory.map(keyword => keyword.toLowerCase());
    const hasMatchingMenu = restAreaMenus.some(menu => 
      searchKeywords.some(keyword => 
        menu.name.toLowerCase().includes(keyword) || 
        menu.description.toLowerCase().includes(keyword)
      )
    );
    if (hasMatchingMenu) {
      score += 15;
    }

    // 프리미엄 메뉴 비율이 높은 경우 가점
    const premiumMenuCount = restAreaMenus.filter(menu => menu.isPremium).length;
    const premiumRatio = premiumMenuCount / restAreaMenus.length;
    score += premiumRatio * 10;

    return { ...restArea, score };
  });

  return scoredRestAreas
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

// 인기 휴게소 추천 (기본 추천)
// --- (restAreas: RestArea[], limit = 3): RestArea[] => (restAreas, limit = 3)
export const getPopularRestAreas = (restAreas, limit = 3) => {
  const scoredRestAreas = restAreas.map(restArea => {
    const restAreaMenus = mockMenus.filter(menu => menu.restAreaId === restArea.restAreaId);
    
    // 평균 평점 계산
    const avgRating = restAreaMenus.length > 0 
      ? restAreaMenus.reduce((sum, menu) => sum + (menu.averageRating || 0), 0) / restAreaMenus.length
      : 0;
    
    // 리뷰 수 합계
    const totalReviews = restAreaMenus.reduce((sum, menu) => sum + (menu.reviewCount || 0), 0);
    
    // 프리미엄 메뉴 비율
    const premiumCount = restAreaMenus.filter(menu => menu.isPremium).length;
    const premiumRatio = restAreaMenus.length > 0 ? premiumCount / restAreaMenus.length : 0;
    
    // 종합 점수 계산
    const score = avgRating * 40 + Math.log(totalReviews + 1) * 20 + premiumRatio * 30;
    
    return { ...restArea, score };
  });

  return scoredRestAreas
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

// 특정 휴게소의 추천 메뉴
// --- (restAreaId: number, limit = 5): FoodMenu[] => (restAreaId, limit = 5)
export const getRecommendedMenusForRestArea = (restAreaId, limit = 5) => {
  const currentUser = getCurrentUser();
  const restAreaMenus = mockMenus.filter(menu => menu.restAreaId === restAreaId);
  
  if (!currentUser) {
    // 로그인하지 않은 경우 평점 높은 순
    return restAreaMenus
      .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
      .slice(0, limit);
  }

  const searchHistory = getSearchHistory();
  const favorites = getFavorites();

  const scoredMenus = restAreaMenus.map(menu => {
    let score = 0;
    
    // 기본 평점 점수
    score += (menu.averageRating || 0) * 20;
    
    // 리뷰 수 점수
    score += Math.log((menu.reviewCount || 0) + 1) * 5;
    
    // 즐겨찾기한 메뉴인 경우 가점
    if (favorites.includes(menu.menuId)) {
      score += 50;
    }
    
    // 검색 히스토리와 매칭되는 경우 가점
    const searchKeywords = searchHistory.map(keyword => keyword.toLowerCase());
    const isMatching = searchKeywords.some(keyword => 
      menu.name.toLowerCase().includes(keyword) || 
      menu.description.toLowerCase().includes(keyword)
    );
    if (isMatching) {
      score += 30;
    }
    
    // 프리미엄 메뉴인 경우 가점
    if (menu.isPremium) {
      score += 15;
    }
    
    return { ...menu, score };
  });

  return scoredMenus
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

// 날씨 기반 메뉴 추천
// --- (weather: 'sunny' | 'rainy' | 'cold' | 'hot', restAreaId?: number) => (weather, restAreaId)
export const getWeatherBasedMenuRecommendations = (
  weather,
  restAreaId
) => {
  let targetMenus = restAreaId 
    ? mockMenus.filter(menu => menu.restAreaId === restAreaId)
    : mockMenus;

  const weatherPreferences = {
    sunny: ['샐러드', '냉면', '아이스크림', '과일'],
    rainy: ['라면', '우동', '국물', '전'],
    cold: ['라면', '우동', '국밥', '호떡', '붕어빵'],
    hot: ['냉면', '아이스크림', '빙수', '차가운']
  };

  const preferredKeywords = weatherPreferences[weather];
  
  const weatherSuitableMenus = targetMenus.filter(menu => 
    preferredKeywords.some(keyword => 
      menu.name.includes(keyword) || 
      menu.description.includes(keyword)
    )
  );

  return weatherSuitableMenus
    .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
    .slice(0, 5);
};

// 시간대 기반 메뉴 추천
// --- (restAreaId?: number) => (restAreaId)
export const getTimeBasedMenuRecommendations = (restAreaId) => {
  const currentHour = new Date().getHours();
  let targetMenus = restAreaId 
    ? mockMenus.filter(menu => menu.restAreaId === restAreaId)
    : mockMenus;

  // --- let timeKeywords: string[] = []; => let timeKeywords = [];
  let timeKeywords = [];

  if (currentHour >= 6 && currentHour < 10) {
    // 아침
    timeKeywords = ['김밥', '토스트', '샌드위치', '커피'];
  } else if (currentHour >= 10 && currentHour < 14) {
    // 점심
    timeKeywords = ['돈까스', '비빔밥', '국밥', '정식'];
  } else if (currentHour >= 14 && currentHour < 18) {
    // 오후 간식
    timeKeywords = ['호떡', '붕어빵', '아이스크림', '커피'];
  } else if (currentHour >= 18 && currentHour < 22) {
    // 저녁
    timeKeywords = ['라면', '우동', '국밥', '정식'];
  } else {
    // 야간
    timeKeywords = ['라면', '컵라면', '김밥'];
  }

  const timeSuitableMenus = targetMenus.filter(menu => 
    timeKeywords.some(keyword => 
      menu.name.includes(keyword) || 
      menu.description.includes(keyword)
    )
  );

  return timeSuitableMenus
    .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
    .slice(0, 5);
};