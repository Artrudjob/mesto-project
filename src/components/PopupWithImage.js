import { Popup } from './Popup';

export class PopupWithImage extends Popup {
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

