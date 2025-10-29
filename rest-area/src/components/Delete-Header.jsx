import React from 'react';

export const Header = ({ activeTab, onTabChange }) => {
  return (
    <header style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #eee' }}>
      <button 
        style={{ fontWeight: activeTab === 'route' ? 'bold' : 'normal' }}
        onClick={() => onTabChange('route')}
      >
        경로 검색
      </button>
      <button 
        style={{ fontWeight: activeTab === 'map' ? 'bold' : 'normal' }}
        onClick={() => onTabChange('map')}
      >
        지도
      </button>
    </header>
  );
};