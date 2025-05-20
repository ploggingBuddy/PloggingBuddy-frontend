// 📁 src/pages/CreateMeetup.js
import React, { useState } from "react";
import Header from "../components/Header";
import MeetupForm from "../components/MeetupForm.jsx";

const CreateMeetup = () => {
  
  const [formData, setFormData] = useState({
    title: "",
    maxParticipants: "",
    deadline: { year: "", month: "", day: "" },
    meetupTime: { month: "", day: "", hour: "", minute: "" },
    images: [],
    location: "",
    latlng: null,
    description: "",
  });

  const [showMap, setShowMap] = useState(false);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDeadlineChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      deadline: { ...prev.deadline, [field]: value },
    }));
  };

  const handleTimeChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      meetupTime: { ...prev.meetupTime, [field]: value },
    }));
  };

  const handleImageChange = (index, file) => {
    const updated = [...formData.images];
    updated[index] = file;
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const handleLocationSelect = ({ addressText, latlng }) => {
  console.log("📍 위치 선택됨:", addressText, latlng);
  setFormData((prev) => ({
    ...prev,
    location: addressText,
    latlng,
  }));
};





  const isFormValid = () => {
    const { title, maxParticipants, deadline, meetupTime, latlng, description } = formData;
    if (
      !title.trim() ||
      !maxParticipants.trim() ||
      !deadline.year || !deadline.month || !deadline.day ||
      !meetupTime.month || !meetupTime.day || !meetupTime.hour || !meetupTime.minute ||
      !latlng ||
      !description.trim()
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!isFormValid()) {
    alert("필수 요소가 모두 입력되지 않았습니다.");
    return;
  }

  const {
    title,
    maxParticipants,
    deadline,
    meetupTime,
    latlng,
    description,
    location,
  } = formData;

  // 날짜 형식 조합
  const fullDeadline = `${deadline.year}-${deadline.month.padStart(2, "0")}-${deadline.day.padStart(2, "0")}T00:00:00.000Z`;
  const fullMeetupTime = `2025-${meetupTime.month.padStart(2, "0")}-${meetupTime.day.padStart(2, "0")}T${meetupTime.hour.padStart(2, "0")}:${meetupTime.minute.padStart(2, "0")}:00.000Z`;

  const payload = {
    member: {
      createdAt: new Date().toISOString(),
      lastModifiedAt: new Date().toISOString(),
      id: 1, // 임시 값
      username: "testuser", // 추후 로그인 사용자 정보로 교체
      nickname: "테스트유저",
      email: "test@example.com",
      address: {
        detailAddress: location,
        latitude: latlng?.lat || 0,
        longitude: latlng?.lng || 0,
      },
      profileImageUrl: "https://example.com/profile.png",
      role: "GUEST",
    },
    requestBody: {
      title,
      content: description,
      participantNumberMax: parseInt(maxParticipants),
      spotName: location,
      spotLongitude: latlng?.lng || 0,
      spotLatitude: latlng?.lat || 0,
      gatheringEndTime: fullDeadline,
      gatheringTime: fullMeetupTime,
      imageList: [], // 이미지 URL은 나중에 추가
    },
  };

  try {
    const token = localStorage.getItem("token"); // JWT 꺼내기
    const res = await fetch("http://added-kamilah-hamlsy-00a9612d.koyeb.app/gathering/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, //JWT 추가
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`서버 오류: ${res.status}`);
    }

    alert("모임 생성 완료!");
  } catch (error) {
    console.error("모임 생성 중 오류:", error);
    alert("모임 생성 실패. 콘솔 확인!");
  }
};


  return (
    <div>
      <MeetupForm
        formData={formData}
        showMap={showMap}
        setShowMap={setShowMap}
        handleChange={handleChange}
        handleDeadlineChange={handleDeadlineChange}
        handleTimeChange={handleTimeChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
        handleLocationSelect={handleLocationSelect}
      />
    </div>
  );
};

export default CreateMeetup;
