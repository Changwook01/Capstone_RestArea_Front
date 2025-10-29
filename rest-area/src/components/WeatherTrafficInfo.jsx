import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Navigation, 
  AlertTriangle, 
  Clock, 
  Thermometer,
  Wind,
  Car,
  MapPin
} from 'lucide-react';

export function WeatherTrafficInfo({ restAreas, onRestAreaSelect }) {
  const [weatherData, setWeatherData] = React.useState(null);
  const [trafficData, setTrafficData] = React.useState([]);
  const [recommendations, setRecommendations] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    loadWeatherAndTrafficData();
  }, [restAreas]);

  const loadWeatherAndTrafficData = async () => {
    setIsLoading(true);
    
    // 실제로는 날씨 API와 교통정보 API를 호출해야 함
    setTimeout(() => {
      // Mock 날씨 데이터
      const mockWeather = {
        location: '경기도 일대',
        temperature: 15,
        condition: 'cloudy',
        description: '구름 많음',
        windSpeed: 12,
        humidity: 65
      };

      // Mock 교통 데이터
      const mockTraffic = restAreas.map(ra => ({
        restAreaId: ra.restAreaId,
        congestionLevel: Math.random() > 0.6 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low',
        estimatedTime: `${Math.floor(Math.random() * 60 + 30)}분`,
        alternativeRoute: Math.random() > 0.7 ? '국도 우회 가능' : undefined
      }));

      setWeatherData(mockWeather);
      setTrafficData(mockTraffic);
      generateSmartRecommendations(mockWeather, mockTraffic);
      setIsLoading(false);
    }, 1000);
  };

  const generateSmartRecommendations = (weather, traffic) => {
    const smartRecs = restAreas.map(restArea => {
      const trafficInfo = traffic.find(t => t.restAreaId === restArea.restAreaId);
      const reasons = [];
      let score = 50; // 기본 점수

      // 날씨 기반 점수 조정
      let weatherSuitability = 'good';
      if (weather.condition === 'rainy') {
        if (restArea.facilities?.includes('실내휴게시설')) {
          score += 20;
          reasons.push('비 오는 날 실내 시설 완비');
          weatherSuitability = 'excellent';
        } else {
          score -= 10;
          weatherSuitability = 'fair';
        }
      } else if (weather.condition === 'sunny' && weather.temperature > 25) {
        if (restArea.facilities?.includes('에어컨')) {
          score += 15;
          reasons.push('더운 날씨, 시원한 실내');
          weatherSuitability = 'excellent';
        }
      }

      // 교통 상황 기반 점수 조정
      let trafficCondition = 'green';
      if (trafficInfo) {
        switch (trafficInfo.congestionLevel) {
          case 'low':
            score += 15;
            reasons.push('교통 상황 원활');
            trafficCondition = 'green';
            break;
          case 'medium':
            score += 5;
            reasons.push('보통 교통 상황');
            trafficCondition = 'yellow';
            break;
          case 'high':
            score -= 15;
            reasons.push('교통 혼잡');
            trafficCondition = 'red';
            if (trafficInfo.alternativeRoute) {
              score += 10;
              reasons.push('우회 경로 있음');
            }
            break;
        }
      }

      // 시설 기반 점수 조정
      if (restArea.facilities?.includes('주유소')) {
        score += 10;
        reasons.push('주유 가능');
      }
      if (restArea.facilities?.includes('전기차충전소')) {
        score += 8;
        reasons.push('전기차 충전 가능');
      }
      if (restArea.facilities?.includes('샤워실')) {
        score += 5;
        reasons.push('샤워 시설 있음');
      }

      // 시간대별 추천
      const currentHour = new Date().getHours();
      if (currentHour >= 12 && currentHour <= 14) {
        reasons.push('점심시간 추천');
        score += 5;
      }

      return {
        restArea,
        score: Math.min(100, Math.max(0, score)),
        reasons: reasons.slice(0, 3), // 최대 3개까지
        weatherSuitability,
        trafficCondition
      };
    });

    // 점수 순으로 정렬
    smartRecs.sort((a, b) => b.score - a.score);
    setRecommendations(smartRecs);
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-5 h-5 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-5 h-5 text-blue-500" />;
      default: return <Cloud className="w-5 h-5 text-gray-500" />;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Navigation className="w-8 h-8 text-blue-500 mx-auto mb-4 animate-spin" />
          <p>날씨 및 교통 정보를 불러오는 중...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* 현재 날씨 정보 */}
      {weatherData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getWeatherIcon(weatherData.condition)}
              현재 날씨
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-orange-500" />
                <span>{weatherData.temperature}°C</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-blue-500" />
                <span>{weatherData.windSpeed}km/h</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-gray-500" />
                <span>{weatherData.humidity}%</span>
              </div>
              <div className="text-sm text-gray-600">
                {weatherData.description}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 스마트 추천 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            AI 스마트 추천
          </CardTitle>
          <p className="text-gray-600">날씨와 교통 상황을 고려한 최적의 휴게소</p>
        </CardHeader>
        <CardContent>
          {recommendations.length > 0 ? (
            <div className="space-y-4">
              {recommendations.slice(0, 5).map((rec, index) => (
                <div key={rec.restArea.restAreaId} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                          {index + 1}
                        </div>
                        <h4 className="font-medium">{rec.restArea.name}</h4>
                        <Badge className={getScoreColor(rec.score)}>
                          {rec.score}점
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{rec.restArea.routeName}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onRestAreaSelect(rec.restArea)}
                    >
                      선택
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {rec.reasons.map((reason, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {reason}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">날씨 적합도:</span>
                      <Badge 
                        variant="outline" 
                        className={
                          rec.weatherSuitability === 'excellent' ? 'text-green-600' :
                          rec.weatherSuitability === 'good' ? 'text-blue-600' :
                          rec.weatherSuitability === 'fair' ? 'text-yellow-600' : 'text-red-600'
                        }
                      >
                        {rec.weatherSuitability === 'excellent' ? '최적' :
                         rec.weatherSuitability === 'good' ? '좋음' :
                         rec.weatherSuitability === 'fair' ? '보통' : '주의'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">교통 상황:</span>
                      <div className={`w-3 h-3 rounded-full ${
                        rec.trafficCondition === 'green' ? 'bg-green-500' :
                        rec.trafficCondition === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              추천할 휴게소가 없습니다.
            </p>
          )}
        </CardContent>
      </Card>

      {/* 교통 주의사항 */}
      {trafficData.some(t => t.congestionLevel === 'high') && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            일부 구간에 교통 혼잡이 예상됩니다. 출발 전 실시간 교통 정보를 확인하세요.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}