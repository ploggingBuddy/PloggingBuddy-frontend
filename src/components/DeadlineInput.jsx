import React from 'react';

const DeadlineInput = ({ deadline, onChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
    <label style={{ fontWeight: 'bold', marginBottom: '10px' }}>모집 마감일</label>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 30px 1fr 30px 1fr 30px',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
      }}
    >
      <input
        type="text"
        placeholder="YYYY"
        value={deadline.year}
        onChange={(e) => onChange('year', e.target.value)}
        style={{ padding: '8px', width: '100%' }}
      />
      <span style={{ paddingLeft: '4px' }}>년</span>

      <input
        type="text"
        placeholder="MM"
        value={deadline.month}
        onChange={(e) => onChange('month', e.target.value)}
        style={{ padding: '8px', width: '100%' }}
      />
      <span style={{ paddingLeft: '4px' }}>월</span>

      <input
        type="text"
        placeholder="DD"
        value={deadline.day}
        onChange={(e) => onChange('day', e.target.value)}
        style={{ padding: '8px', width: '100%' }}
      />
      <span style={{ paddingLeft: '4px' }}>일</span>
    </div>
  </div>
);

export default DeadlineInput;
