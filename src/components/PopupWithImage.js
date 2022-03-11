import { Popup } from './Popup';

export class PopupWithImage extends Popup {
    constructor(popupSelector, imgSelector) {
        super(popupSelector); 
        this._imgSelector = document.querySelector(imgSelector);
        this._popupName =  this._popupSelector.querySelector('.popup__name');
    }

    open(imgLink, imgName) {
        super.open();
        this._imgSelector.setAttribute('src', imgLink);
        this._imgSelector.setAttribute('alt', imgName);
        this._popupName.textContent = imgName;
    }
}

