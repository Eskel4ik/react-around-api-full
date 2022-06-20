class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    sendCardData(item) {
        this._name = item.name;
        this._link = item.link;
        return fetch(`${this._baseUrl}/cards`, {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify({
                    name: this._name,
                    link: this._link
                })
            })
            .then(this._checkResponce);
    }
    setUserInfo({ name, about, avatar }) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    name,
                    about,
                    avatar
                })
            })
            .then(this._checkResponce);
    }
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
                method: "GET",
                headers: this._headers
            })
            .then(this._checkResponce);
    }
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                method: "GET",
                headers: this._headers
            })
            .then(this._checkResponce);
    }
    deleteCard(data) {
        return fetch(`${this._baseUrl}/cards/${data._id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponce);
    }
    likeAdd(data) {
        return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
            method: "PUT",
            headers: this._headers,
        }).then(this._checkResponce);
    }
    likeDelete(data) {
        return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponce);
    }
    changeLikeCardStatus(cardData, isLiked) {
        return !isLiked ? this.likeAdd(cardData) : this.likeDelete(cardData);
    }
    editProfilePhoto(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(this._checkResponce);
    }
    _checkResponce(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }
}
const jwt = localStorage.getItem('jwt');
const api = new Api({
    baseUrl: "https://api.oleg.students.nomoreparties.sbs",
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json"
    }
});
export default api;