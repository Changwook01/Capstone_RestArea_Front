import { create } from 'zustand';

// 목업 데이터는 실제 앱에서는 API 호출로 가져오게 됩니다.
import { mockRestAreas } from '../data/mockData';

const useAppStore = create((set) => ({
  // --- 상태 (State) ---
  activeTab: 'route', // 기본 탭을 'route'로 설정
  routeRestAreas: [], // 경로 검색 결과 (휴게소 목록)

  // --- 상태 변경 함수 (Actions) ---
  setActiveTab: (tabName) => set({ activeTab: tabName }),

  // 경로 검색을 실행하고 결과를 상태에 저장하는 함수
  searchRoute: (departure, destination) => {
    // 실제로는 API를 호출해야 하지만, 지금은 목업 데이터를 사용합니다.
    console.log(`경로 검색: ${departure} -> ${destination}`);
    // 검색이 성공했다고 가정하고, routeRestAreas 상태를 업데이트합니다.
    set({ routeRestAreas: mockRestAreas.slice(0, 3) }); // 예시로 3개만 잘라서 넣음
  },
}));

export default useAppStore;