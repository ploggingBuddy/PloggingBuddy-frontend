import React from "react";
import TitleInput from "./TitleInput.jsx";
import ParticipantInput from "./ParticipantInput.jsx";
import DeadlineInput from "./DeadlineInput.jsx";
import ImageUpload from "./ImageUpload.jsx";
import LocationInput from "./LocationInput.jsx";
import DescriptionInput from "./DescriptionInput.jsx";
import MeetupTimeInput from "./MeetupTimeInput.jsx";
//import MapModal from "./MapModal.jsx";
import MapModal2 from "./MapModal2.jsx";

const MeetupForm = ({
  formData,
  showMap,
  setShowMap,
  handleChange,
  handleDeadlineChange,
  handleTimeChange,
  handleImageChange,
  handleSubmit,
  handleLocationSelect
}) => (
  <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
    <form onSubmit={handleSubmit}>
      <TitleInput
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "40px",
          width: "100%",
          marginBottom: "40px",
        }}
      >
        <ParticipantInput
          value={formData.maxParticipants}
          onChange={(e) => handleChange("maxParticipants", e.target.value)}
        />
        <DeadlineInput
          deadline={formData.deadline}
          onChange={handleDeadlineChange}
        />
        <LocationInput
          location={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
          onMapToggle={() => setShowMap(true)}
        />
        <MeetupTimeInput
          meetupTime={formData.meetupTime}
          onChange={handleTimeChange}
        />
      </div>

      {showMap && (
        <MapModal2
          key={Date.now()}
          onClose={() => setShowMap(false)} 
          onSelect={(data) => {
            handleLocationSelect(data);
            setShowMap(false);
          }}
        />
      )}

      <DescriptionInput
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <div style={{ display: "flex", gap: "20px", alignItems: "flex-end", marginTop: "20px" }}>
        <div style={{ flex: 1 }}>
          <ImageUpload images={formData.images} onChange={handleImageChange} />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#6DBE45",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            height: "fit-content"
          }}
        >
          + 모임 생성하기
        </button>
      </div>
    </form>
  </div>
);

export default MeetupForm;
