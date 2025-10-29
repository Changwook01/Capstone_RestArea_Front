// 로컬 스토리지 유틸리티 함수들

// 즐겨찾기 관리
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem('rest-area-favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch {
    return [];
  }
};

export const addToFavorites = (menuId) => {
  const favorites = getFavorites();
  if (!favorites.includes(menuId)) {
    favorites.push(menuId);
    localStorage.setItem('rest-area-favorites', JSON.stringify(favorites));
  }
};

export const removeFromFavorites = (menuId) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(id => id !== menuId);
  localStorage.setItem('rest-area-favorites', JSON.stringify(updatedFavorites));
};

export const isFavorite = (menuId) => {
  const favorites = getFavorites();
  return favorites.includes(menuId);
};

// 사용자 세션 관리
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('current-user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const setCurrentUser = (user) => {
  localStorage.setItem('current-user', JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem('current-user');
};

// 검색 히스토리 관리
export const getSearchHistory = () => {
  try {
    const history = localStorage.getItem('search-history');
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

export const addToSearchHistory = (keyword) => {
  if (!keyword.trim()) return;
  
  const history = getSearchHistory();
  const filteredHistory = history.filter(item => item !== keyword);
  filteredHistory.unshift(keyword);
  
  // 최대 10개까지만 저장
  const updatedHistory = filteredHistory.slice(0, 10);
  localStorage.setItem('search-history', JSON.stringify(updatedHistory));
};

// 최근 방문한 휴게소 관리
export const getRecentRestAreas = () => {
  try {
    const recent = localStorage.getItem('recent-rest-areas');
    return recent ? JSON.parse(recent) : [];
  } catch {
    return [];
  }
};

export const addToRecentRestAreas = (restAreaId) => {
  const recent = getRecentRestAreas();
  const filtered = recent.filter(id => id !== restAreaId);
  filtered.unshift(restAreaId);
  
  // 최대 5개까지만 저장
  const updated = filtered.slice(0, 5);
  localStorage.setItem('recent-rest-areas', JSON.stringify(updated));
};