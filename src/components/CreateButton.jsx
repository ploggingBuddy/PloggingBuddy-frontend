import React from 'react';
import { useNavigate } from 'react-router-dom';

function CreateButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/create');
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        float: 'right',
        marginBottom: '20px',
      }}
    >
      + 모임 생성하기
    </button>
  );
}

export default CreateButton;
