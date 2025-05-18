import React from 'react';

const ParticipantInput = ({ value, onChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label style={{ fontWeight: 'bold', marginBottom: '10px' }}>최대 참여 인원</label>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="number"
        placeholder="N"
        value={value}
        onChange={onChange}
        style={{ width: '100%', padding: '8px' }}
      />
      <span style={{ marginLeft: '8px' }}>명</span>
    </div>
  </div>
);

export default ParticipantInput;
