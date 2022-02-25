import { Popup, popupImg } from './popup-oop';

class PopupWithImage extends Popup {
    constructor(popupSelector, imgSelector) {
        super(popupSelector); 
        this._imgSelector = imgSelector;
    }

    open(name, imgLink, imgName) {
        super.open();
        this._imgSelector.setAttribute('src', imgLink);
        this._imgSelector.setAttribute('alt', imgName);
        name.textContent = imgName;
    }
}


const popupWithImage = new PopupWithImage(document.querySelector('#popup-img'), document.querySelector('.popup__img'));

export { PopupWithImage, popupWithImage };
