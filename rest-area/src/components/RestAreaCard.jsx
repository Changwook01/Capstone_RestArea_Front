import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Clock, Utensils, Star, TrendingUp } from 'lucide-react';
// import { RestArea, FoodMenu } from '../types'; // --- 타입 import 제거
import { mockMenus } from '../data/mockData'; // --- 이 파일은 .js로 직접 만드셔야 합니다.

// interface RestAreaCardProps { ... } // --- interface 제거

// : React.FC<RestAreaCardProps> 제거
export const RestAreaCard = ({
  restArea,
  onRestAreaClick,
  onMenuClick,
  showRecommendations = true,
  compact = false
}) => {
  // 해당 휴게소의 메뉴들
  const restAreaMenus = mockMenus.filter(menu => menu.restAreaId === restArea.restAreaId);
  
  // 인기 메뉴 (평점 높은 순)
  const popularMenus = restAreaMenus
    .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
    .slice(0, compact ? 2 : 3);

  if (compact) {
    return (
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onRestAreaClick(restArea)}>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div>
              <h3 className="font-medium">{restArea.name}</h3>
              <p className="text-sm text-gray-600">{restArea.routeName}</p>
            </div>
            {restArea.distance && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="w-3 h-3" />
                <span>{restArea.distance}</span>
                {restArea.estimatedArrival && (
                  <>
                    <Clock className="w-3 h-3 ml-2" />
                    <span>{restArea.estimatedArrival}</span>
                  </>
                )}
              </div>
            )}
            {popularMenus.length > 0 && (
              <div className="text-xs text-gray-500">
                인기: {popularMenus.map(menu => menu.name).join(', ')}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{restArea.name}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{restArea.routeName}</Badge>
              {restArea.distance && (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>{restArea.distance}</span>
                </div>
              )}
              {restArea.estimatedArrival && (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{restArea.estimatedArrival}</span>
                </div>
              )}
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onRestAreaClick(restArea)}
          >
            상세보기
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">{restArea.address}</p>
          {restArea.facilities && (
            <div className="flex flex-wrap gap-1">
              {restArea.facilities.slice(0, 4).map((facility, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {facility}
                </Badge>
              ))}
              {restArea.facilities.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{restArea.facilities.length - 4}
                </Badge>
              )}
            </div>
          )}
        </div>

        {showRecommendations && popularMenus.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <h4 className="font-medium text-sm">인기 메뉴</h4>
            </div>
            <div className="space-y-2">
              {popularMenus.map((menu) => (
                <div 
                  key={menu.menuId}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => onMenuClick && onMenuClick(menu)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{menu.name}</span>
                      {menu.isPremium && (
                        <Badge variant="default" className="text-xs">프리미엄</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm">{menu.price.toLocaleString()}원</span>
                      {menu.averageRating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">{menu.averageRating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Utensils className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
            {restAreaMenus.length > popularMenus.length && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-2"
                onClick={() => onRestAreaClick(restArea)}
              >
                전체 메뉴 보기 ({restAreaMenus.length}개)
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};