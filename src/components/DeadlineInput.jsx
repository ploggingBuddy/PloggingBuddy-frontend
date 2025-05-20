import React from 'react';

const DeadlineInput = ({ deadline, onChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
    <label style={{ fontWeight: 'bold', marginBottom: '10px' }}>모집 마감일</label>
    <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
      {[
        { label: '년', placeholder: 'YYYY', value: deadline.year, key: 'year', min: 2024, max: 2100 },
        { label: '월', placeholder: 'MM', value: deadline.month, key: 'month', min: 1, max: 12 },
        { label: '일', placeholder: 'DD', value: deadline.day, key: 'day', min: 1, max: 31 },
      ].map(({ label, placeholder, value, key, min, max }) => (
        <div
          key={key}
          style={{
            position: 'relative',
            flex: 1,
          }}
        >
          <input
            type="number"
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val) && (val === "" || (Number(val) >= min && Number(val) <= max))) {
                onChange(key, val);
              }
            }}
            min={min}
            max={max}
            style={{
              padding: '8px',
              width: '100%',
              paddingRight: '28px',
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