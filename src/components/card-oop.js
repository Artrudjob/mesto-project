import {
    meId
} from './index';
import {
    api
} from './api-oop';
import {
    closePopup,
    openPopup,
    popupDeleteCard
} from "./modal";

export class Card {
    constructor({
        data
    }, userId) {
        this._name = data.name;
        this._link = data.link;
        this._likesCount = data.likesCount;
        this._ownerId = data.ownerId;
        this._likes = data.likes;
        this._cardId = data.cardId;
        this._userId = userId;
    }
    createCard() {
        const cardTemplate = document.querySelector('#card');
        const cardLikes = cardTemplate.querySelector('.card__number-likes');
        const cardBtnHeart = cardTemplate.querySelector('.card__heart');
        const cardBtnTrashBin = cardTemplate.querySelector('.card__trash-bin');
        const cardImage = cardTemplate.querySelector('.card__image');
        const cardText = cardTemplate.querySelector('.card__text');
        cardLikes.textContent = this._likesCount
        cardImage.setAttribute('src', this._link);
        cardImage.setAttribute('alt', this._name);
        cardText.textContent = this._name;
        if (meId == this._ownerId) {
            cardBtnTrashBin.classList.add('card__trash-bin_visible');
        }

        if (this._likes.filter(like => like._id == meId).length > 0) {
            cardBtnHeart.classList.toggle('card__heart_active');
        }

        //переделать по нормальному
        function likedHeart() {
            if (cardBtnHeart.classList.contains('card__heart_active')) {
                api.removeLikeCard(this._cardId)
                    //removeLikeCard(cardId)
                    .then((result) => {
                        cardLikes.textContent = result.likes.length;
                        cardBtnHeart.classList.remove('card__heart_active');
                    })
                    .catch(err => console.log(`Что-то пошло не так: ${err}`));
            } else {
                api.addLikeCard(this._cardId)
                    //addLikeCard(cardId)
                    .then((result) => {
                        cardLikes.textContent = result.likes.length;
                        cardBtnHeart.classList.add('card__heart_active');
                    })
                    .catch(err => console.log(`Что-то пошло не так: ${err}`));
            }
        }
        cardBtnHeart.addEventListener('click', likedHeart);
        cardBtnTrashBin.addEventListener('click', function (event) {
            openPopup(popupDeleteCard);
            itemCard = event.target.closest('.card');
            itemCardId = this._cardId;
        });

        function openFullImage() {
            popupImage.setAttribute('src', this._link);
            popupImage.setAttribute('alt', this._name);
            popupName.textContent = this._name;
            openPopup(popupImg);
        }

        cardImage.addEventListener('click', function () {
            openFullImage()
        });

        return cardTemplate;
    }

    renderCard(cardTemplate, containerCards) {
        containerCards.prepend(cardTemplate);
    }

    deleteCard(card) {
        api.deleteUserCard(itemCardId)
            //deleteUserCard(itemCardId)
            .then(() => {
                closePopup(popupDeleteCard);
                card.remove();
            })
            .catch(err => console.log(`Что-то пошло не так: ${err}`))
    }

}
const agreeDeleteCard = popupDeleteCard.querySelector('#delete-button');
agreeDeleteCard.addEventListener('click', () => {
    deleteCard(itemCard)
});

