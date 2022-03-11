export class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        this._popupSelector.removeEventListener('click', this._clickCloseBtn.bind(this));
    }

    _clickCloseBtn() {
        this.close();
    }

    setEventListeners() {
        this._popupSelector.querySelector('.popup__exit').addEventListener('click', () => {this._clickCloseBtn()});
    }
}
