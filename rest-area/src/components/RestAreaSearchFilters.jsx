import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Search, Filter, X, MapPin } from 'lucide-react';
// import { RestAreaSearchFilters } from '../types'; // --- 타입 import 제거

// interface RestAreaSearchFiltersProps { ... } // --- interface 제거

const routeOptions = [
  { value: 'all', label: '전체 고속도로' },
  { value: '경부고속도로', label: '경부고속도로' },
  { value: '중부고속도로', label: '중부고속도로' },
  { value: '서해안고속도로', label: '서해안고속도로' },
  { value: '영동고속도로', label: '영동고속도로' },
  { value: '남해고속도로', label: '남해고속도로' },
  { value: '중앙고속도로', label: '중앙고속도로' },
  { value: '88고속도로', label: '88고속도로' },
];

const regionOptions = [
  { value: 'all', label: '전체 지역' },
  { value: '서울/경기', label: '서울/경기' },
  { value: '강원', label: '강원' },
  { value: '충북', label: '충북' },
  { value: '충남', label: '충남' },
  { value: '전북', label: '전북' },
  { value: '전남', label: '전남' },
  { value: '경북', label: '경북' },
  { value: '경남', label: '경남' },
  { value: '제주', label: '제주' },
];

const facilityOptions = [
  '주유소', '전기차충전소', 'LPG충전소', '화물차주차장', 
  '숙박시설', '세차장', '정비소', '샤워실', 'ATM', '편의점'
];

// : React.FC<RestAreaSearchFiltersProps> 제거
export const RestAreaSearchFilters = ({
  filters,
  onFiltersChange,
  onSearch,
  searchHistory = []
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  // value: string -> value
  const handleKeywordChange = (value) => {
    onFiltersChange({ ...filters, keyword: value });
  };

  // value: string -> value
  const handleRouteChange = (value) => {
    onFiltersChange({ 
      ...filters, 
      routeName: value === 'all' ? undefined : value 
    });
  };

  // value: string -> value
  const handleRegionChange = (value) => {
    onFiltersChange({ 
      ...filters, 
      region: value === 'all' ? undefined : value 
    });
  };

  // facility: string, checked: boolean -> facility, checked
  const handleFacilityToggle = (facility, checked) => {
    const currentFacilities = filters.facilities || [];
    const newFacilities = checked
      ? [...currentFacilities, facility]
      : currentFacilities.filter(f => f !== facility);
    
    onFiltersChange({
      ...filters,
      facilities: newFacilities.length > 0 ? newFacilities : undefined
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
    setShowAdvanced(false);
  };

  const hasActiveFilters = filters.routeName || filters.region || (filters.facilities && filters.facilities.length > 0);

  // keyword: string -> keyword
  const handleHistoryClick = (keyword) => {
    onFiltersChange({ ...filters, keyword });
  };

  return (
    <div className="space-y-4">
      {/* 기본 검색 */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            placeholder="휴게소명을 검색하세요 (예: 안성, 금강)"
            value={filters.keyword || ''}
            onChange={(e) => handleKeywordChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        
        <Select value={filters.routeName || 'all'} onValueChange={handleRouteChange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {routeOptions.map((route) => (
              <SelectItem key={route.value} value={route.value}>
                {route.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={onSearch} className="px-6">
          <Search className="w-4 h-4 mr-2" />
          검색
        </Button>

        <Button 
          variant="outline" 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-4"
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* 검색 히스토리 */}
      {!filters.keyword && searchHistory.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 mr-2">최근 검색:</span>
          {searchHistory.slice(0, 5).map((keyword, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="cursor-pointer hover:bg-gray-200"
              onClick={() => handleHistoryClick(keyword)}
            >
              {keyword}
            </Badge>
          ))}
        </div>
      )}

      {/* 고급 필터 */}
      {showAdvanced && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">상세 필터</h3>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-1" />
                필터 초기화
              </Button>
            )}
          </div>

          {/* 지역 필터 */}
          <div>
            <label className="text-sm font-medium mb-2 block">지역</label>
            <Select value={filters.region || 'all'} onValueChange={handleRegionChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regionOptions.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 편의시설 필터 */}
          <div>
            <label className="text-sm font-medium mb-2 block">편의시설</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {facilityOptions.map((facility) => (
                <div key={facility} className="flex items-center space-x-2">
                  <Checkbox
                    id={facility}
                    checked={(filters.facilities || []).includes(facility)}
                    onCheckedChange={(checked) => handleFacilityToggle(facility, checked)}
                  />
                  <label htmlFor={facility} className="text-sm">{facility}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 활성 필터 표시 */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">적용된 필터:</span>
          
          {filters.routeName && (
            <Badge variant="default">
              {routeOptions.find(route => route.value === filters.routeName)?.label}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => onFiltersChange({ ...filters, routeName: undefined })}
              />
            </Badge>
          )}
          
          {filters.region && (
            <Badge variant="default">
              {regionOptions.find(region => region.value === filters.region)?.label}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => onFiltersChange({ ...filters, region: undefined })}
              />
            </Badge>
          )}
          
          {filters.facilities && filters.facilities.map((facility) => (
            <Badge key={facility} variant="default">
              {facility}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => handleFacilityToggle(facility, false)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};