import {
    api
} from "./api.js";

import {
    popupDeleteCard
} from "./popup.js";
import {
    popupWithImage
} from "./PopupWithImage";
import {
    meId
} from "./index";
const popupContainerImg = document.querySelector('.popup__container-img');
const popupDelCard = document.querySelector('#popup-delete-card');
const popupName = popupContainerImg.querySelector('.popup__name');
const agreeDeleteCard = popupDelCard.querySelector('#delete-button');

export class Card {
    constructor(data) {
        this._name = data.name;
        this._link = data.link;
        this._likesCount = data.likesCount;
        this._ownerId = data.ownerId;
        this._likes = data.likes;
        this._cardId = data.cardId
    }
    
    
    // Получаем шаблон карточки
    _getTemplate() {
        this._card = document.querySelector('#card').cloneNode(true).content;
        return this._card;
    }


    _openFullImage() {
        popupWithImage.open(popupName, this._link, this._name);
    }

    _deleteCard() {
        console.log(this._cardId)
        api.deleteUserCard(this._cardId)
            .then(() => {
                console.log(this._cardId)
                popupDeleteCard.close();
                this.itemCard.remove();
                this._element = null;
            })
            .catch(err => console.log(`Что-то пошло не так: ${err}`))
    }
    
    

    _setEventListeners() {
        // agreeDeleteCard.addEventListener('click', () => {
        //     this._deleteCard(this._cardId)
        // });
        // увеличение
        this._cardImage.addEventListener('click', (evt) => {
            this._openFullImage();
            console.log(evt.target.closest('.card'))
            console.log(this._cardId)
        });
        // удаление
        this._deleteBtn.addEventListener('click', (evt) => {
            this._deleteCard(this._cardId)
            // popupDeleteCard.open();
            this.itemCard = evt.target.closest('.card');
            // this.itemCardId = this._cardId;
            console.log(this.itemCard)
            console.log(this.itemCardId)
        })
        // лайк
        this._likeBtn.addEventListener('click', () => {
            this.likedHeart()
        })

    }


    createCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.card__image');;
        this._likeBtn = this._element.querySelector('.card__heart');
        this._likesNumber = this._element.querySelector('.card__number-likes');
        this._deleteBtn = this._element.querySelector('.card__trash-bin');
        this._text = this._element.querySelector('.card__text');
        this._cardImage = this._element.querySelector('.card__image');
        this._image.src = this._link;
        this._image.alt = this._name;
        this._text.textContent = this._name;
        this._hasDeleteBtn();
        this._isCardLiked()
        this._likesNumber.textContent = this._likes.length;
        this._setEventListeners();
        if (meId == this._ownerId) {
            this._deleteBtn.classList.add('card__trash-bin_visible');
        }

        if (this._likes.filter(like => like._id == meId).length > 0) {
            this._likeBtn.classList.toggle('card__heart_active');
        }

        return this._element;
    }
    //проверка лайка
    _isCardLiked() {
        if (this._likes.some((user) => {
                return this._userId === user._id;
            })) {
            this._likeBtn.classList.add('element__like-btn_active');
        }
    }

    // поставить/удалить лайк, изменение количества лайков
    likedHeart() {
        if (this._likeBtn.classList.contains('card__heart_active')) {
            api.removeLikeCard(this._cardId)
                //removeLikeCard(cardId)
                .then((result) => {
                    this._likesNumber.textContent = result.likes.length;
                    this._likeBtn.classList.remove('card__heart_active');
                })
                .catch(err => console.log(`Что-то пошло не так: ${err}`));
        } else {
            api.addLikeCard(this._cardId)
                //addLikeCard(cardId)
                .then((result) => {
                    this._likesNumber.textContent = result.likes.length;
                    this._likeBtn.classList.add('card__heart_active');
                })
                .catch(err => console.log(`Что-то пошло не так: ${err}`));
        }
    }

    // проверяем владельца карточки и убираем кнопку Delete
    _hasDeleteBtn() {
        if (this._userId !== this._cardOwnerId) {
            this._deleteBtn.remove();
        }
    }

    renderCard() {
        document.querySelector('.cards').prepend(this.createCard());
    }
}