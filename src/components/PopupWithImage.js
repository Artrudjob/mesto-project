import {
    Popup
} from './Popup';

export class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._image = this._popupElement.querySelector(".popup__img");
        this._imageSubtitle = this._popupElement.querySelector(
            ".popup__name"
        );
    }
    open(data) {
        super.open();
        console.log(this._image.src)
        this._image.src = data.image;
        this._image.alt = data.text;
        this._imageSubtitle.textContent = `${data.text}`;
    }
}