import React from 'react';
import Header from '../components/Header';
import UserInfo from '../components/UserInfo';
import MapSection from '../components/MapSection';
import CreateButton from '../components/CreateButton';

function MainPage() {
  return (
    <div>
      <Header />
      <div style={{  padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2>모임</h2>
        <UserInfo /><CreateButton />
        <MapSection />
      </div>
    </div>
  );
}

export default MainPage;
