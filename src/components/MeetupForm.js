import React from 'react';
import TitleInput from './TitleInput';
import ParticipantInput from './ParticipantInput';
import DeadlineInput from './DeadlineInput';
import ImageUpload from './ImageUpload';
import LocationInput from './LocationInput';
import DescriptionInput from './DescriptionInput';
import MapModal from './MapModal';

const MeetupForm = ({
  formData, showMap, setShowMap,
  handleChange, handleDeadlineChange,
  handleImageChange, handleSubmit,
}) => (
  <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
    <form onSubmit={handleSubmit}>
      <TitleInput value={formData.title} onChange={(e) => handleChange('title', e.target.value)} />

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px',
        width: '100%', marginBottom: '40px'
      }}>
        <ParticipantInput
          value={formData.maxParticipants}
          onChange={(e) => handleChange('maxParticipants', e.target.value)}
        />
        <DeadlineInput
          deadline={formData.deadline}
          onChange={handleDeadlineChange}
        />
        <ImageUpload
          images={formData.images}
          onChange={handleImageChange}
        />
        <LocationInput
          location={formData.location}
          onChange={(e) => handleChange('location', e.target.value)}
          onMapToggle={() => setShowMap(true)}
        />
      </div>

      {showMap && (
        <MapModal
          onClose={() => setShowMap(false)}
          onSelect={(loc) => handleChange('location', loc)}
        />
      )}

      <DescriptionInput
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />

      <button type="submit" style={{
        backgroundColor: 'green', color: 'white', padding: '10px 20px',
        border: 'none', borderRadius: '5px', cursor: 'pointer'
      }}>
        + 모임 생성하기
      </button>
    </form>
  </div>
);

export default MeetupForm;
