import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { MapPin, Navigation, Clock, Fuel, Car, Route } from 'lucide-react';

export function RouteSearch({ onRouteRestAreas }) {
  const [departure, setDeparture] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);
  const [routeInfo, setRouteInfo] = React.useState(null);

  // 모의 경로 검색 결과
  const mockRouteRestAreas = [
    {
      restAreaId: 1,
      name: '안성휴게소(서울방향)',
      routeName: '경부고속도로',
      address: '경기도 안성시 공도읍 신두리 271-1',
      coordinates: { lat: 37.0089, lng: 127.2734 },
      facilities: ['주유소', '전기차충전소', '편의점', '화장실', 'ATM'],
      distance: '45km',
      estimatedArrival: '약 40분 후'
    },
    {
      restAreaId: 2,
      name: '천안휴게소(서울방향)',
      routeName: '경부고속도로',
      address: '충청남도 천안시 동남구 목천읍 삼성리 산75-1',
      coordinates: { lat: 36.8151, lng: 127.1139 },
      facilities: ['주유소', '경정비소', '편의점', '화장실', '샤워실'],
      distance: '85km',
      estimatedArrival: '약 1시간 20분 후'
    },
    {
      restAreaId: 3,
      name: '옥천휴게소(서울방향)',
      routeName: '경부고속도로',
      address: '충청북도 옥천군 옥천읍 금구리 490-3',
      coordinates: { lat: 36.3064, lng: 127.5708 },
      facilities: ['주유소', '전기차충전소', '편의점', '화장실'],
      distance: '125km',
      estimatedArrival: '약 2시간 후'
    }
  ];

  const handleSearch = async () => {
    if (!departure || !destination) return;

    setIsSearching(true);
    
    // 실제로는 Google Maps API를 호출해야 함
    setTimeout(() => {
      const mockRoute = {
        distance: '195km',
        duration: '약 2시간 30분',
        restAreas: mockRouteRestAreas
      };
      
      setRouteInfo(mockRoute);
      onRouteRestAreas(mockRouteRestAreas);
      setIsSearching(false);
    }, 1500);
  };

  const handleQuickRoute = (dep, dest) => {
    setDeparture(dep);
    setDestination(dest);
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
              <label className="block mb-2">출발지</label>
              <Input
                placeholder="출발지를 입력하세요"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2">목적지</label>
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
              <>
                <Navigation className="w-4 h-4 mr-2 animate-spin" />
                경로 검색 중...
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 mr-2" />
                경로 검색
              </>
            )}
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
                  {routeInfo.restAreas.length}개 휴게소
                </Badge>
              </div>

              <Separator />

              {/* 경로상 휴게소 목록 */}
              <div>
                <h4 className="mb-3">경로상 휴게소</h4>
                <div className="space-y-3">
                  {routeInfo.restAreas.map((restArea, index) => (
                    <div key={restArea.restAreaId} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium">{restArea.name}</h5>
                        <p className="text-sm text-gray-600">{restArea.routeName}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-blue-600">{restArea.distance}</span>
                          <span className="text-sm text-gray-500">{restArea.estimatedArrival}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {restArea.facilities?.slice(0, 3).map((facility, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                        {(restArea.facilities?.length || 0) > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{(restArea.facilities?.length || 0) - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}