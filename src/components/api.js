class Api {
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

    getCards() {
        this.getInfo();
        return fetch(`${this._baseUrl}cards`, {
                headers: this._headers
            })
            .then(res => this._checkResponse(res));
    }

    getAppInfo() {
        return Promise.all([this.getInfo(), this.getCards()]);
    }

    sendInfo(myName, aboutMe) {
        return fetch(`${this._baseUrl}users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: myName,
                    about: aboutMe
                })
            })
            .then(res => this._checkResponse(res));
    }

    addNewCard(namePlace, placeLink) {
        return fetch(`${this._baseUrl}cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: namePlace,
                    link: placeLink
                })
            })
            .then(res => this._checkResponse(res));
    }

    deleteUserCard(id) {
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

    updateAvatarUser(imgLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: `${imgLink}`
                })
            })
            .then(res => this._checkResponse(res));
    }
}

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6/',
    headers: {
        authorization: 'c6ea2481-28ed-4e6a-9bbe-85a531661bf0',
        'Content-Type': 'application/json'
    }
});

export {
    api
}