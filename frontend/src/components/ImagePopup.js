import { popupOpened } from "../utils/constants";

function ImagePopup({ isOpen, handleOverlay, card, onClose }) {
  return (
    <div
      className={`popup-img popup ${(isOpen && popupOpened) || ""}`}
      onClick={handleOverlay}
    >
      <div className="popup-img__container">
        <img className="popup-img__image" src={card.link} alt={card.name} />
        <h2 className="popup-img__title">{card.name}</h2>
        <button
          type="button"
          className="popup-img__close close-btn"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
