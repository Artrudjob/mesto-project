//* Класс карточки
export class Card {
    constructor(
        data,
        template,
        meId,
        imagePopup,
        deleteCard,
        addLike,
        deleteLike
    ) {
        this._data = data;
        this._template = template;
        this._meId = meId;
        this._cardId = data._id;
        this._cardOwnerId = data.owner._id;
        this._imagePopup = imagePopup;
        this._element = this._getTemplate();
        this._likeBtn = this._element.querySelector(".card__heart");
        this._likesNumber = this._element.querySelector(".card__number-likes");
        this._deleteBtn = this._element.querySelector('.card__trash-bin');
        this._deleteCard = deleteCard;
        this._addLike = addLike;
        this._deleteLike = deleteLike;
    }
    _setEventListeners() {
        if (this._cardOwnerId === this._meId) {
            this._deleteBtn.classList.add("card__trash-bin_visible");
            this._deleteBtn.addEventListener("click", () =>
                this._deleteButtonClick()
            );
        }
        this._likeBtn.addEventListener("click", () => this._likeToggler());

        this._element
            .querySelector(".card__image")
            .addEventListener("click", this._imagePopup);
    }
    _likeToggler() {
        if (!this._likeBtn.classList.contains("card__heart_active")) {
            this._addLike(this._cardId)
                .then((res) => {
                    this._data = res;
                    this._likesNumber.textContent = res.likes.length;
                    this._likeBtn.classList.add("card__heart_active");
                })
                .catch((err) => console.log(err));
        } else {
            this._deleteLike(this._cardId)
                .then((res) => {
                    this._data = res;
                    this._likesNumber.textContent = res.likes.length;
                    this._likeBtn.classList.remove("card__heart_active");
                })
                .catch((err) => console.log(err));
        }
    }

    _setIsLiked() {
        if (this._data.likes.some(elem => elem._id === this._meId)) {
            this._likeBtn.classList.add("card__heart_active");
        }
    }
    _deleteButtonClick() {
        const data = {
            card: this._element,
            cardId: this._cardId,
        };
        this._deleteCard(data);
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._template)
        .content.querySelector(".card").cloneNode(true);
        return cardElement;
    }

    createCard() {
        this._setEventListeners();
        const cardImage = this._element.querySelector(".card__image");
        cardImage.alt = `${this._data.name}`;
        cardImage.src = this._data.link;
        this._element.querySelector(
            ".card__text"
        ).textContent = this._data.name;
        this._element.querySelector(
            ".card__number-likes"
        ).textContent = this._data.likes.length;
        this._setIsLiked();
        return this._element;
    }

}

