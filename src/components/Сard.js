const popupContainerImg = document.querySelector('.popup__container-img');
const popupName = popupContainerImg.querySelector('.popup__name');
export let itemCard;
export let itemCardId;

export class Card {
    constructor(data, selectorTemplateElement, PopupWithImage, popupDeleteCard, Api, meId) {
        this._name = data.name;
        this._link = data.link;
        this._likesCount = data.likesCount;
        this._ownerId = data.ownerId;
        this._likes = data.likes;
        this._cardId = data.cardId

        this._selectorTemplateElement = selectorTemplateElement;

        this._popupWithImage = PopupWithImage;
        this._popupDeleteCard = popupDeleteCard;
        this._api = Api;

        this._meId = meId;
        //this._popupWithImage = new PopupWithImage(document.querySelector('#popup-img'), document.querySelector('.popup__img'));
    }
    
    
    // Получаем шаблон карточки
    _getTemplate() {
        /*this._card = document.querySelector('#card').cloneNode(true).content;
        return this._card;*/
        return this._selectorTemplateElement.cloneNode(true).content;
    }


    _openFullImage() {
        this._popupWithImage.open(popupName, this._link, this._name);
        //popupWithImage.open(popupName, this._link, this._name);
    }
    
    _openDeletePopup() {
        this._popupDeleteCard.open();
    }


    _setEventListeners() {
        // увеличение
        this._cardImage.addEventListener('click', (evt) => {
            this._openFullImage();
        }); 
        // удаление
        this._deleteBtn.addEventListener('click', (evt) => {
            this._openDeletePopup();
            this.itemCard = evt.target.closest('.card');
            itemCard = this.itemCard;
            this.itemCardId = this._cardId;
            itemCardId = this.itemCardId;
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
        if (this._meId == this._ownerId) {
            this._deleteBtn.classList.add('card__trash-bin_visible');
        }

        if (this._likes.filter(like => like._id == this._meId).length > 0) {
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
            this._api.removeLikeCard(this._cardId)
                .then((result) => {
                    this._likesNumber.textContent = result.likes.length;
                    this._likeBtn.classList.remove('card__heart_active');
                })
                .catch(err => console.log(`Что-то пошло не так: ${err}`));
        } else {
            this._api.addLikeCard(this._cardId)
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