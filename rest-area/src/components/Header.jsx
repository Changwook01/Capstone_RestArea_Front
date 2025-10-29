import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  MapPin, 
  Heart, 
  User, 
  Menu as MenuIcon,
  Search,
  Settings,
  Route,
  Sparkles
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { getCurrentUser, logout } from '../utils/storage';

export const Header = ({
  activeTab,
  onTabChange,
  favoriteCount
}) => {
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const navItems = [
    { id: 'route', label: '경로 검색', icon: Route },
    { id: 'map', label: '지도', icon: MapPin },
    { id: 'search', label: '휴게소 검색', icon: Search },
    { id: 'favorites', label: '즐겨찾기', icon: Heart, badge: favoriteCount > 0 ? favoriteCount : undefined }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        {/* 로고 */}
        <div className="flex items-center gap-2">
          <div className="text-2xl">🚗</div>
          <h1 className="text-xl font-bold text-blue-600">휴게소맛집</h1>
        </div>

        {/* 네비게이션 (데스크톱) */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="relative"
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
                {item.badge && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>

        {/* 사용자 메뉴 */}
        <div className="flex items-center gap-2">
          {/* 모바일 네비게이션 */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MenuIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => onTabChange(item.id)}
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                      {item.badge && (
                        <Badge variant="destructive" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* 사용자 드롭다운 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {currentUser?.nickname || '게스트'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {currentUser ? (
                <>
                  <DropdownMenuItem disabled>
                    <User className="w-4 h-4 mr-2" />
                    {currentUser.nickname}
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Badge variant="outline" className="text-xs">
                      {currentUser.role === 'traveler' ? '여행객' : 
                       currentUser.role === 'operator' ? '운영자' : '관리자'}
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {currentUser.role === 'operator' && (
                    <DropdownMenuItem onClick={() => onTabChange('operator')}>
                      <Settings className="w-4 h-4 mr-2" />
                      운영자 대시보드
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    로그아웃
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => onTabChange('login')}>
                    로그인
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onTabChange('signup')}>
                    회원가입
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};