// 📁 src/pages/CreateMeetup.js
import React, { useState } from 'react';
import Header from '../components/Header';
import MeetupForm from '../components/MeetupForm';

const CreateMeetup = () => {
  const [formData, setFormData] = useState({
    title: '',
    maxParticipants: '',
    deadline: { year: '', month: '', day: '' },
    images: [],
    location: '', // 화면에 보일 주소 or 위도경도
    latlng: null, // 실제 저장할 좌표 (추가)
    description: '',
  });

  const [showMap, setShowMap] = useState(false);

  // 일반 입력 핸들링 (title, location 등)
  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // 모집 마감일 입력 핸들링 (year, month, day)
  const handleDeadlineChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      deadline: { ...prev.deadline, [field]: value },
    }));
  };

  // 이미지 파일 변경 핸들링
  const handleImageChange = (index, file) => {
    const updated = [...formData.images];
    updated[index] = file;
    setFormData(prev => ({ ...prev, images: updated }));
  };

  // 지도에서 위치 선택한 결과 처리
  const handleLocationSelect = ({ addressText, latlng }) => {
    setFormData(prev => ({
      ...prev,
      location: addressText,  // 사용자에게 보일 주소
      latlng: latlng          // 실제 저장할 좌표
    }));
  };

  // 최종 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, maxParticipants, deadline, latlng, description, images } = formData;
    const fullDeadline = `${deadline.year}-${deadline.month}-${deadline.day}`;

    const sendData = new FormData();
    sendData.append('title', title);
    sendData.append('maxParticipants', maxParticipants);
    sendData.append('deadline', fullDeadline);
    sendData.append('location', JSON.stringify(latlng)); // 위도경도만 전송
    sendData.append('description', description);
    images.forEach(img => img && sendData.append('images', img));

    // 전송 확인용 콘솔 출력
    for (let [key, value] of sendData.entries()) {
      console.log(key, value);
    }

    alert('데이터 준비 완료! (백엔드 연동 시 바로 전송 가능)');
  };

  return (
    <div>
      <Header />
      <MeetupForm
        formData={formData}
        showMap={showMap}
        setShowMap={setShowMap}
        handleChange={handleChange}
        handleDeadlineChange={handleDeadlineChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
        handleLocationSelect={handleLocationSelect} // 지도에서 위치 선택 시 호출
      />
    </div>
  );
};

export default CreateMeetup;
