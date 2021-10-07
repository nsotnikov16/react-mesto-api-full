import {useRef, useState} from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup({ isOpen, onClose, handleOverlay, onUpdateAvatar }) {
  const avatarRef = useRef();
  const [buttonText, setButtonText] = useState("Сохранить");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText("Сохранение...");
    setButtonDisabled(true);
    onUpdateAvatar(
      {
        avatar: avatarRef.current.value,
      },
      setButtonText,
      setButtonDisabled,
      e.target
    );
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      handleOverlay={handleOverlay}
      buttonText={buttonText}
      buttonDisabled={buttonDisabled}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          type="url"
          name="link"
          id="link-update-input"
          placeholder="Ссылка на аватар"
          className="popup__input popup__input_field_link"
          ref={avatarRef}
          required
        />
        <span
          className="popup__input-error"
          id="link-update-input-error"
        ></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
