/* const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6/',
    headers: {
        authorization: 'c6ea2481-28ed-4e6a-9bbe-85a531661bf0',
        'Content-type': 'application/json'
    }
};

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

const getInfo = () => {
    return fetch(`${config.baseUrl}users/me`, {
        headers: config.headers
    })
    .then(res => checkResponse(res));
}

const getCards = () => {
    getInfo();
    return fetch(`${config.baseUrl}cards`, {
        headers: config.headers
    })
    .then(res => checkResponse(res));
}

const getAppInfo = () => {
    return Promise.all([getInfo(), getCards()]);
}

const sendInfo = (myName, aboutMe) => {
    return fetch (`${config.baseUrl}users/me`, {
        method: 'PATCH', 
        headers: config.headers,
        body: JSON.stringify({
            name: myName,
            about: aboutMe
        })
    })
    .then(res => checkResponse(res));
}

const addNewCard = (namePlace, placeLink) => {
    return fetch (`${config.baseUrl}cards`, {
        method: 'POST',
        headers: config.headers, 
        body: JSON.stringify({
            name: namePlace,
            link: placeLink
        })
    })
    .then(res => checkResponse(res));
}

const deleteUserCard = (id) => {
    return fetch (`${config.baseUrl}cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => checkResponse(res));
}

const addLikeCard = (id) => {
    return fetch (`${config.baseUrl}cards/likes/${id}`, {
        method: 'PUT', 
        headers: config.headers
    })
    .then(res => checkResponse(res));
}

const removeLikeCard = (id) => {
    return fetch (`${config.baseUrl}cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => checkResponse(res));
}

const updateAvatarUser = (imgLink) => {
    return fetch (`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: `${imgLink}`
        })
    })
    .then(res => checkResponse(res));
}

export { getInfo, getCards, sendInfo, getAppInfo, addNewCard, deleteUserCard, addLikeCard, removeLikeCard, updateAvatarUser };  */