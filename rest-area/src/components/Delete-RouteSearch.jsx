import React, { useState } from 'react';

export const RouteSearch = ({ onRouteRestAreas }) => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const handleSearch = () => {
        // 실제로는 길찾기 API를 호출해야 합니다.
        // 여기서는 임시로 mock 데이터를 반환합니다.
        console.log(`경로 검색: ${start} -> ${end}`);
        // onRouteRestAreas([{ restAreaId: 1 }, { restAreaId: 5 }]); // 예시
    };

    return (
        <div>
            <input type="text" value={start} onChange={e => setStart(e.target.value)} placeholder="출발지" />
            <input type="text" value={end} onChange={e => setEnd(e.target.value)} placeholder="도착지" />
            <button onClick={handleSearch}>경로 검색</button>
        </div>
    );
};