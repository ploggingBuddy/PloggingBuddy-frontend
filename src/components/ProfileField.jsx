import editIcon from "../assets/edit.svg";

function ProfileField({
  label,
  value,
  onChange,
  onEdit,
  editable = true,
  inputClass = "",
}) {
  return (
    <div>
      <label className="rg-14">{label}</label>
      <div className="profile-field--input">
        <input
          className={`rg-14 ${inputClass}`}
          value={value}
          onChange={onChange}
          disabled={!editable}
        />
        {onEdit && (
          <button className="edit-btn" onClick={onEdit}>
            <img className="edit-icon" src={editIcon} alt="edit" />
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileField;
