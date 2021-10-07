import { popupOpened } from "../utils/constants";
import {useRef} from "react";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  handleOverlay,
  buttonText,
  buttonDisabled,
}) {
  const formRef = useRef();

  return (
    <div
      className={`popup popup-${name} ${(isOpen && popupOpened) || ""}`}
      onClick={handleOverlay}
    >
      <div className="popup__container container-profile">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          className={`popup__form form-${name}`}
          name={`form-${name}`}
        >
          {children}

          <button
            type="submit"
            name="submit"
            className="popup__save"
            disabled={buttonDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
