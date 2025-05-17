import React from 'react';

const DescriptionInput = ({ value, onChange }) => (
  <div style={{ marginBottom: '20px' }}>
    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>
      모임 설명
    </label>
    <textarea
      rows="5"
      placeholder="모임에 대한 설명을 입력하세요."
      value={value}
      onChange={onChange}
      style={{ width: '100%', padding: '10px', fontSize: '14px' }}
    />
  </div>
);

export default DescriptionInput;
