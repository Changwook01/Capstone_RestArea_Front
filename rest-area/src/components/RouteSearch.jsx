import React from 'react';
import axios from 'axios';
// ui 컴포넌트 import 시, 상위 폴더로 이동(..)해야 합니다.
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { MapPin, Navigation, Clock, Car, Route } from 'lucide-react';

/* 미터(m)를 킬로미터(km) 문자열로 변환 */
const formatDistance = (meters) => {
  if (meters === undefined) return '';
  const km = (meters / 1000).toFixed(1); // 소수점 첫째 자리까지
  return `총 ${km}km`;
};

/* API 응답의 duration은 '초(seconds)' 단위이므로
  밀리초(ms)가 아닌 초(s)를 기준으로 변환합니다.
*/
const formatDuration = (seconds) => {
  if (seconds === undefined) return '';
  const totalMinutes = Math.round(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  let result = '약 ';
  if (hours > 0) {
    result += `${hours}시간 `;
  }
  result += `${minutes}분`;
  return result;
};

export function RouteSearch({ onRouteRestAreas }) {
  const [departure, setDeparture] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);
  const [routeInfo, setRouteInfo] = React.useState(null);

  /* 백엔드 API 호출 전용 함수
    @param {Array<[number, number]>} polylineData - [[lng, lat], [lng, lat], ...] 형태의 좌표 배열
  */
  const fetchRestAreasFromBackend = async (polylineData) => {
    try {
      // 2-B. Spring Boot 백엔드 API (POST /api/route/rest-areas)로 Polyline 전송
      console.log("백엔드로 전송할 Polyline 좌표 개수:", polylineData.length);
      
      // (주의) axios.post의 URL을 'http://localhost:8080'으로 시작해야 할 수 있습니다.
      const response = await axios.post('http://localhost:8080/api/rest-areas/route-polyline', { polyline: polylineData });
      
      // 2-C. Spring Boot 서버가 반환한 휴게소 목록
      return response.data; // (예: [RestAreaDTO, RestAreaDTO, ...])

    } catch (error) {
      console.error("백엔드 휴게소 API 호출 실패:", error);
      return []; // 에러 발생 시 빈 배열 반환
    }
  };

  // --- (삭제됨) ---
  // mockRouteRestAreas 배열이 여기서 삭제되었습니다.
  // (새로운 API 로직에서는 더 이상 필요하지 않습니다)
  // ---

  const handleSearch = async () => {
    if (!departure || !destination) {
      alert("출발지와 목적지를 입력하세요.");
      return;
    }

    setIsSearching(true);
    setRouteInfo(null);
    onRouteRestAreas([]);

    try {
      // (임시) 하드코딩된 위도/경도
      // TODO: 'departure'와 'destination' 텍스트를 위도/경도로 변환하는 로직 필요
      const originCoord = "127.110153,37.394727";
      const destinationCoord = "127.108242,37.401932";

      const response = await axios.get(`http://localhost:8080/api/rest-areas/route`, {
        params: {
          origin: originCoord,
          destination: destinationCoord
        }
      });

      const data = response.data;

      if (!data.routes || data.routes.length === 0 || data.routes[0].result_code !== 0) {
        throw new Error(data.routes ? data.routes[0].result_msg : "유효한 경로를 찾지 못했습니다.");
      }

      const pathData = data.routes[0];

      // --- 1. 정보 표시 (Task 1) ---
      const summary = pathData.summary;
      const formattedDistance = formatDistance(summary.distance);
      const formattedDuration = formatDuration(summary.duration); // API 응답이 '초' 단위
      
      setRouteInfo({
        distance: formattedDistance,
        duration: formattedDuration,
        restAreas: [], 
        restAreaCount: 0
      });

      const allVertexes = []; // [[lng, lat], [lng, lat], ...] 형태
      
      pathData.sections.forEach(section => {
        section.roads.forEach(road => {
          for (let i = 0; i < road.vertexes.length; i += 2) {
            allVertexes.push([
              road.vertexes[i],   // 경도(lng)
              road.vertexes[i+1]  // 위도(lat)
            ]);
          }
        });
      });

      // 2-B. 추출한 Polyline으로 백엔드 API (2단계) 호출
      const foundRestAreas = await fetchRestAreasFromBackend(allVertexes);

      // 2-C. 백엔드에서 받은 휴게소 정보로 UI 최종 업데이트
      onRouteRestAreas(foundRestAreas); // App.jsx의 상태 업데이트
      
      setRouteInfo(prevInfo => ({ 
        ...prevInfo,
        restAreas: foundRestAreas,
        restAreaCount: foundRestAreas.length
      }));

    } catch (error) {
      console.error("경로 검색 중 에러 발생:", error);
      alert(`경로 검색에 실패했습니다: ${error.message}`);
    } finally {
      setIsSearching(false);
    }
  }; // <<< 여기가 `handleSearch` 함수의 끝입니다.

  // --- (삭제됨) ---
  // 여기에 있던 불필요한 '}' 괄호와
  // 'setTimeout' 찌꺼기 코드가 모두 삭제되었습니다.
  // ---

  const handleQuickRoute = (dep, dest) => {
    setDeparture(dep);
    setDestination(dest);
    // (참고) 빠른 경로 버튼도 'handleSearch'를 호출하도록 연결하는 것이 좋습니다.
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="w-5 h-5" />
            경로 검색
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">출발지</label>
              <Input
                placeholder="출발지를 입력하세요"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">목적지</label>
              <Input
                placeholder="목적지를 입력하세요"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <Button 
            onClick={handleSearch}
            disabled={!departure || !destination || isSearching}
            className="w-full"
          >
            {isSearching ? (
              <Navigation className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Navigation className="w-4 h-4 mr-2" />
            )}
            {isSearching ? '경로 검색 중...' : '경로 검색'}
          </Button>

          {/* 빠른 경로 설정 */}
          <div>
            <p className="text-sm mb-2 text-gray-600">빠른 설정</p>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleQuickRoute('서울', '부산')}
              >
                서울 → 부산
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleQuickRoute('서울', '대전')}
              >
                서울 → 대전
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleQuickRoute('대구', '서울')}
              >
                대구 → 서울
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* routeInfo가 null이 아닐 때만 이 카드를 렌더링 */}
      {routeInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              검색 결과
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 경로 정보 */}
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-blue-600" />
                    <span>{routeInfo.distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>{routeInfo.duration}</span>
                  </div>
                </div>
                <Badge variant="secondary">
                  {/* 2단계 API가 로딩 중일 땐 '...' 표시 */}
                  {isSearching && routeInfo.restAreaCount === 0 ? '...' : `${routeInfo.restAreaCount}개 휴게소`}
                </Badge>
              </div>

              {/* 경로상 휴게소 목록은 App.jsx의 <WeatherTrafficInfo>에서 
                표시하므로 여기서는 Separator만 남깁니다.
                만약 이 컴포넌트 *안*에도 목록을 표시하고 싶다면
                아래 주석을 해제하고 onRestAreaSelect 프롭을 받아와야 합니다.
              */}
              <Separator />

              {/* 경로상 휴게소 목록 (선택적) */}
              {/*
              <div>
                <h4 className="mb-3">경로상 휴게소</h4>
                <div className="space-y-3">
                  {routeInfo.restAreas.map((restArea, index) => (
                    <div key={restArea.restAreaId} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50">
                      // ... (휴게소 정보 표시) ...
                    </div>
                  ))}
                </div>
              </div>
              */}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}