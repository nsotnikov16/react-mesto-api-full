export const codeEscape = 27;
export const popupOpened = "popup_opened";

export const apiRequest = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
    headers: {
      authorization: 'ae96c89c-0c63-4b1c-b822-1b0fac9d9184',
      'Content-Type': 'application/json',
    }
}

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__input_type_error',
  errorActiveClass: 'popup__input-error_active',
}; 