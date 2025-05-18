import React from 'react';

const DeadlineInput = ({ deadline, onChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
    <label style={{ fontWeight: 'bold', marginBottom: '10px' }}>모집 마감일</label>
    <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
      {[
        { label: '년', placeholder: 'YYYY', value: deadline.year, key: 'year' },
        { label: '월', placeholder: 'MM', value: deadline.month, key: 'month' },
        { label: '일', placeholder: 'DD', value: deadline.day, key: 'day' },
      ].map(({ label, placeholder, value, key }) => (
        <div
          key={key}
          style={{
            position: 'relative',
            flex: 1,
          }}
        >
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(key, e.target.value)}
            style={{
              padding: '8px',
              width: '100%',
              paddingRight: '28px', // 오른쪽 공간 확보
              boxSizing: 'border-box',
            }}
          />
          <span
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#888',
              pointerEvents: 'none',
              fontSize: '14px',
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default DeadlineInput;
