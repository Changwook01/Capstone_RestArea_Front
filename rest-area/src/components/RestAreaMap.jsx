import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Star, Navigation, Sparkles } from 'lucide-react';
// import { RestArea, FoodMenu } from '../types'; // --- 타입 import 제거
import { RestAreaCard } from './RestAreaCard'; // --- 2번에서 만든 RestAreaCard.jsx
// --- 이 파일은 .js로 직접 만드셔야 합니다.
import { getPersonalizedRestAreaRecommendations } from '../utils/recommendations';

// interface RestAreaMapProps { ... } // --- interface 제거

// : React.FC<RestAreaMapProps> 제거
export const RestAreaMap = ({
  restAreas,
  onSelectRestArea,
  onMenuSelect,
  selectedRestArea,
  title
}) => {
  // AI 추천 휴게소
  const recommendedRestAreas = getPersonalizedRestAreaRecommendations(restAreas, 3);
  
  return (
    <div className="space-y-6">
      {/* AI 추천 휴게소 */}
      {recommendedRestAreas.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <h3 className="font-medium">추천 휴게소</h3>
            <Badge variant="secondary">AI 추천</Badge>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {recommendedRestAreas.map((restArea) => (
              <RestAreaCard
                key={restArea.restAreaId}
                restArea={restArea}
                onRestAreaClick={onSelectRestArea}
                onMenuClick={onMenuSelect}
                showRecommendations={true}
                compact={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* 모든 주변 휴게소 */}
      <div>
        <h3 className="font-medium mb-4">{title} ({restAreas.length}개)</h3>
        {/* <h3 className="font-medium mb-4">주변 휴게소 ({restAreas.length}개)</h3>*/}
        {restAreas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restAreas.map((restArea) => (
              <RestAreaCard
                key={restArea.restAreaId}
                restArea={restArea}
                onRestAreaClick={onSelectRestArea}
                onMenuClick={onMenuSelect}
                showRecommendations={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">표시할 휴게소가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};