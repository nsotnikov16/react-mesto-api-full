import {useContext, useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, handleOverlay, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("Сохранить");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChange(evt) {
    evt.target.name === "name"
      ? setName(evt.target.value)
      : setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText("Сохранение...");
    setButtonDisabled(true);
    onUpdateUser(
      {
        name,
        about: description,
      },
      setButtonText,
      setButtonDisabled
    );
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      handleOverlay={handleOverlay}
      buttonText={buttonText}
      buttonDisabled={buttonDisabled}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          type="text"
          name="name"
          id="name-profile-input"
          placeholder="Имя"
          className="popup__input popup__input_field_username"
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleChange}
          required
        />
        <span
          className="popup__input-error"
          id="name-profile-input-error"
        ></span>
      </fieldset>
      <fieldset className="popup__fieldset">
        <input
          type="text"
          name="info"
          id="info-profile-input"
          placeholder="О себе"
          className="popup__input popup__input_field_info"
          minLength="2"
          maxLength="200"
          value={description || ""}
          onChange={handleChange}
          required
        />
        <span
          className="popup__input-error"
          id="info-profile-input-error"
        ></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
