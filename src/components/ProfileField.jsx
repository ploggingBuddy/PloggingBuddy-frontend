import React, { forwardRef } from "react";
import editIcon from "../assets/edit.svg";

const ProfileField = forwardRef(({ label, defaultValue, onEdit }, ref) => {
  return (
    <div>
      <label className="rg-14">{label}</label>
      <div className="profile-field--input">
        <input
          ref={ref}
          type="text"
          defaultValue={defaultValue}
          readOnly={!onEdit}
        />
        {onEdit && (
          <button type="button" className="edit-btn" onClick={onEdit}>
            <img className="edit-icon" src={editIcon} alt="edit" />
          </button>
        )}
      </div>
    </div>
  );
});

ProfileField.displayName = "ProfileField";

export default ProfileField;
