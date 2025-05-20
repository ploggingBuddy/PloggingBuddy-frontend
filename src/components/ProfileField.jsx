import { useRef } from "react";
import editIcon from "../assets/edit.svg";

function ProfileField({
  label,
  value,
  onChange,
  onEdit,
  editable = true,
  inputClass = "",
}) {
  const inputRef = useRef(null);

  const handleEdit = (e) => {
    e.preventDefault(); // 이벤트 기본 동작 방지
    if (inputRef.current && typeof onEdit === "function") {
      onEdit();
    }
  };

  return (
    <div>
      <label className="rg-14">{label}</label>
      <div className="profile-field--input">
        <input
          ref={inputRef}
          className={`rg-14 ${inputClass}`}
          value={value}
          onChange={onChange}
          disabled={!editable}
        />
        {onEdit && (
          <button type="button" className="edit-btn" onClick={handleEdit}>
            <img className="edit-icon" src={editIcon} alt="edit" />
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileField;
