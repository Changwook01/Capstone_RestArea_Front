// 목업 휴게소 데이터
export const mockRestAreas = [
  {
    restAreaId: 1,
    serviceAreaCode: "001",
    name: "기흥휴게소",
    routeName: "경부고속도로",
    address: "경기도 용인시 기흥구 청덕대로 1700",
    latitude: 37.2236,
    longitude: 127.1033,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    facilities: ["수유실", "약국", "편의점", "주유소"]
  },
  {
    restAreaId: 2,
    serviceAreaCode: "002", 
    name: "안성휴게소",
    routeName: "경부고속도로",
    address: "경기도 안성시 미양면 안성맞춤대로 2477-30",
    latitude: 37.0045,
    longitude: 127.2182,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    facilities: ["수유실", "병원", "편의점", "주유소", "전기차 충전소"]
  },
  {
    restAreaId: 3,
    serviceAreaCode: "003",
    name: "망향휴게소",
    routeName: "경부고속도로", 
    address: "경기도 이천시 마장면 경충대로 3150",
    latitude: 37.1656,
    longitude: 127.3789,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    facilities: ["수유실", "편의점", "주유소"]
  },
  {
    restAreaId: 4,
    serviceAreaCode: "004",
    name: "죽암휴게소",
    routeName: "중부고속도로",
    address: "경기도 안성시 일죽면 중부대로 1007",
    latitude: 37.0956,
    longitude: 127.4123,
    createdAt: "2024-01-01T00:00:00Z", 
    updatedAt: "2024-01-01T00:00:00Z",
    facilities: ["수유실", "편의점", "주유소", "정비소"]
  },
  {
    restAreaId: 5,
    serviceAreaCode: "005",
    name: "덕평휴게소",
    routeName: "경부고속도로",
    address: "경기도 이천시 마장면 덕이로 27-3",
    latitude: 37.1547,
    longitude: 127.3345,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z", 
    facilities: ["수유실", "약국", "편의점", "주유소", "전기차 충전소"]
  }
];

// 목업 메뉴 데이터
export const mockMenus = [
  {
    menuId: 1,
    restAreaId: 1,
    name: "향천우동",
    price: 6500,
    description: "진한 멸치 육수에 쫄깃한 우동면이 어우러진 기흥휴게소 대표 메뉴",
    isPremium: false,
    category: "한식",
    imageUrl: "https://images.unsplash.com/photo-1749880191161-a7fcab31c4e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmb29kJTIwbWVudSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzU4NTg2NDIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    restAreaName: "기흥휴게소",
    averageRating: 4.5,
    reviewCount: 128,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    menuId: 2,
    restAreaId: 1,
    name: "소고기국밥",
    price: 9000,
    description: "푸짐한 소고기와 진한 국물이 일품인 든든한 한 끼",
    isPremium: true,
    category: "한식",
    imageUrl: "https://images.unsplash.com/photo-1573470571028-a0ca7a723959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoaWdod2F5JTIwcmVzdCUyMGFyZWElMjBmb29kfGVufDF8fHx8MTc1ODU4NjQxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    restAreaName: "기흥휴게소",
    averageRating: 4.2,
    reviewCount: 89,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    menuId: 3,
    restAreaId: 2,
    name: "수제 왕돈까스",
    price: 11000,
    description: "안성휴게소 시그니처 메뉴, 바삭한 돈까스와 특제 소스",
    isPremium: true,
    category: "양식",
    restAreaName: "안성휴게소",
    averageRating: 4.7,
    reviewCount: 256,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    menuId: 4,
    restAreaId: 2,
    name: "김치찌개",
    price: 7500,
    description: "집에서 먹는 것처럼 깊은 맛의 김치찌개",
    isPremium: false,
    category: "한식",
    restAreaName: "안성휴게소",
    averageRating: 4.3,
    reviewCount: 145,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    menuId: 5,
    restAreaId: 3,
    name: "명동칼국수",
    price: 6000,
    description: "쫄깃한 면발과 시원한 멸치 육수의 조화",
    isPremium: false,
    category: "한식",
    restAreaName: "망향휴게소",
    averageRating: 4.1,
    reviewCount: 67,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    menuId: 6,
    restAreaId: 4,
    name: "매콤떡볶이",
    price: 5500,
    description: "매콤달콤한 특제 소스의 떡볶이",
    isPremium: false,
    category: "분식",
    restAreaName: "죽암휴게소",
    averageRating: 4.0,
    reviewCount: 78,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    menuId: 7,
    restAreaId: 5,
    name: "덕평 족발",
    price: 15000,
    description: "덕평휴게소 명물, 부드러운 족발과 쌈채소",
    isPremium: true,
    category: "한식",
    restAreaName: "덕평휴게소",
    averageRating: 4.8,
    reviewCount: 189,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    menuId: 8,
    restAreaId: 5,
    name: "치킨버거",
    price: 8500,
    description: "바삭한 치킨과 신선한 야채가 들어간 버거",
    isPremium: false,
    category: "양식",
    restAreaName: "덕평휴게소", 
    averageRating: 3.9,
    reviewCount: 134,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

// 목업 리뷰 데이터
export const mockReviews = [
  {
    reviewId: 1,
    userId: 1,
    menuId: 1,
    nickname: "맛잘알",
    rating: 5,
    content: "향천우동 정말 맛있어요! 국물이 진하고 면발이 쫄깃해서 최고입니다. 기흥휴게소 올 때마다 꼭 먹어요.",
    imageUrl: "https://images.unsplash.com/photo-1573470571028-a0ca7a723959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoaWdod2F5JTIwcmVzdCUyMGFyZWElMjBmb29kfGVufDF8fHx8MTc1ODU4NjQxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    createdAt: "2024-09-15T21:00:00Z",
    updatedAt: "2024-09-15T21:00:00Z",
    reply: {
      replyId: 1,
      reviewId: 1,
      operatorId: 1,
      content: "소중한 리뷰 감사합니다! 항상 최고의 맛으로 보답하겠습니다.",
      createdAt: "2024-09-16T10:00:00Z",
      updatedAt: "2024-09-16T10:00:00Z"
    }
  },
  {
    reviewId: 2,
    userId: 2,
    menuId: 3,
    nickname: "여행러버",
    rating: 5,
    content: "왕돈까스 크기가 정말 크고 바삭해요! 소스도 맛있고 가성비 좋습니다.",
    createdAt: "2024-09-14T15:30:00Z",
    updatedAt: "2024-09-14T15:30:00Z"
  },
  {
    reviewId: 3,
    userId: 3,
    menuId: 7,
    nickname: "족발매니아",
    rating: 5,
    content: "덕평 족발은 정말 전설이에요. 부드럽고 냄새도 안 나고 최고입니다!",
    createdAt: "2024-09-13T19:45:00Z",
    updatedAt: "2024-09-13T19:45:00Z"
  },
  {
    reviewId: 4,
    userId: 4,
    menuId: 2,
    nickname: "국밥좋아",
    rating: 4,
    content: "소고기국밥 양이 많고 맛있어요. 다만 조금 더 진했으면 좋겠어요.",
    createdAt: "2024-09-12T12:20:00Z",
    updatedAt: "2024-09-12T12:20:00Z"
  }
];

// 목업 사용자 데이터
export const mockUsers = [
  {
    userId: 1,
    email: "user1@example.com",
    nickname: "맛잘알",
    role: "traveler",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    userId: 2,
    email: "operator@giheung.com",
    nickname: "기흥휴게소",
    role: "operator",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

// 카테고리 목록
export const menuCategories = [
  { value: "all", label: "전체" },
  { value: "한식", label: "한식" },
  { value: "양식", label: "양식" },
  { value: "중식", label: "중식" },
  { value: "일식", label: "일식" },
  { value: "분식", label: "분식" },
  { value: "디저트", label: "디저트" },
  { value: "음료", label: "음료" }
];

// 지역별 휴게소 그룹핑
export const restAreasByRoute = {
  "경부고속도로": mockRestAreas.filter(area => area.routeName === "경부고속도로"),
  "중부고속도로": mockRestAreas.filter(area => area.routeName === "중부고속도로"),
  "영동고속도로": mockRestAreas.filter(area => area.routeName === "영동고속도로")
};