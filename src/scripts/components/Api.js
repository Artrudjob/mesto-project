export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    //проверка статуса запроса  
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getInfo() {
        return fetch(`${this._baseUrl}users/me`, {
                headers: this._headers
            })
            .then(res => this._checkResponse(res));
    }

    getInitialCards() {
        this.getInfo();
        return fetch(`${this._baseUrl}cards`, {
                headers: this._headers
            })
            .then(res => this._checkResponse(res));
    }



    editProfile(data) {
        console.log(data.userName, data.userCareer);
        return fetch(`${this._baseUrl}users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.userName,
                    about: data.userCareer
                })
            })
            .then(res => this._checkResponse(res));
    }

    addNewCard(card) {
        return fetch(`${this._baseUrl}cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: card.cardName,
                    link: card.cardLink
                })
            })
            .then(res => this._checkResponse(res));
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}cards/${id}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(res => this._checkResponse(res));
    }

    addLikeCard(id) {
        return fetch(`${this._baseUrl}cards/likes/${id}`, {
                method: 'PUT',
                headers: this._headers
            })
            .then(res => this._checkResponse(res));
    }

    removeLikeCard(id) {
        return fetch(`${this._baseUrl}cards/likes/${id}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(res => this._checkResponse(res));
    }

    editAvatar(imgLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: `${imgLink.userAvatar}`
                })
            })
            .then(res => this._checkResponse(res));
    }
}