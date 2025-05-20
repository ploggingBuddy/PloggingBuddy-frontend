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
  setShowMap(false); // ✅ 지도 모달 닫기
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

    const { title, maxParticipants, deadline, meetupTime, latlng, description, images } = formData;
    const fullDeadline = `${deadline.year}-${deadline.month}-${deadline.day}`;
    const fullMeetupTime = `${meetupTime.month}-${meetupTime.day} ${meetupTime.hour}:${meetupTime.minute}`;

    const sendData = new FormData();
    sendData.append("title", title);
    sendData.append("maxParticipants", maxParticipants);
    sendData.append("deadline", fullDeadline);
    sendData.append("meetupTime", fullMeetupTime);
    sendData.append("location", JSON.stringify(latlng));
    sendData.append("description", description);
    images.forEach((img) => img && sendData.append("images", img));

    for (let [key, value] of sendData.entries()) {
      console.log(key, value);
    }

    alert("데이터 준비 완료! (백엔드 연동 시 전송 가능)");
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
