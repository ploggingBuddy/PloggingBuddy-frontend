import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const LocationInput = ({ location, onChange, onMapToggle }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label style={{ fontWeight: 'bold', marginBottom: '10px' }}>모임 장소</label>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="장소를 입력하거나 지도를 선택하세요"
        value={location}
        onChange={onChange}
        style={{ flex: 1, padding: '10px', marginRight: '10px' }}
      />
      <button
        type="button"
        onClick={onMapToggle}
        style={{
          backgroundColor: '#eee',
          border: '1px solid #ccc',
          padding: '8px 10px',
          cursor: 'pointer',
          borderRadius: '5px',
        }}
      >
        <FaMapMarkerAlt />
      </button>
    </div>
  </div>
);

export default LocationInput;
