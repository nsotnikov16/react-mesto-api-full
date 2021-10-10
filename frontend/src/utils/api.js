export class Api {
  constructor(baseUrl) {
    this._headers = (token) => {
      return {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      }
    };
    this._url = baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return res.json().then(({ message }) => Promise.reject(`${message}`));
  }

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers(token)
    }).then(this._handleResponse);
  }

  getUserData(token) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers(token),
    }).then(this._handleResponse);
  }

  editProfile(inputsValue, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers(token),
      body: JSON.stringify({
        name: inputsValue.name,
        about: inputsValue.about,
      }),
    }).then(this._handleResponse);
  }

  editAvatar(inputsValue, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers(token),
      body: JSON.stringify({
        avatar: inputsValue.avatar,
      }),
    }).then(this._handleResponse);
  }

  addNewCardServer(inputsValue, token) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers(token),
      body: JSON.stringify({
        name: inputsValue.name,
        link: inputsValue.link,
      }),
    }).then(this._handleResponse);
  }

  putLikeCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers(token),
    }).then(this._handleResponse);
  }

  deleteLikeCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers(token),
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers(token),
    }).then(this._handleResponse);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers(token),
    }).then(this._handleResponse);
  }
}

const api = new Api('https://api.byns16.nomoredomains.monster');
export default api;
