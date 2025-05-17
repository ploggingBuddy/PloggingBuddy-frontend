import React from 'react';
import { FaImage } from 'react-icons/fa';

const ImageUpload = ({ images, onChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label style={{ fontWeight: 'bold', marginBottom: '10px' }}>모임 이미지 첨부 (최대 2장)</label>
    <div style={{ display: 'flex', gap: '10px' }}>
      {[0, 1].map((i) => (
        <label
          key={i}
          style={{
            flex: 1,
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <FaImage />
          이미지 업로드 하세요.
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => onChange(i, e.target.files[0])}
          />
        </label>
      ))}
    </div>
  </div>
);

export default ImageUpload;
