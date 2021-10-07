import success from "../images/success.svg";
import unsuccess from "../images/unsuccess.svg";

export default function InfoTooltip({
  isSuccess,
  isOpen,
  onClose,
  handleOverlay,
  history,
}) {
  return (
    <div
      className={`popup popup-infotooltip ${(isOpen && "popup_opened") || ''}`}
      onClick={handleOverlay}
    >
      <div className="popup__container popup__container_infotooltip">
        <button
          type="button"
          className="popup__close"
          onClick={() => {
            onClose()
            if (isSuccess) history.push("/sign-in");
          }}
        ></button>
        <img
          className="popup__image"
          src={isSuccess ? success : unsuccess}
          alt="register"
        />
        <h2 className="popup__title popup__title_infotooltip">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}
