import {
    Popup
} from './Popup';
export class PopupWithForm extends Popup {
    constructor(popupElement, {
        formSubmitCallBack
    }) {
        super(popupElement);
        this._formSubmitCallBack = formSubmitCallBack;
        this._formSubmit = this._formSubmit.bind(this);
        this._form = this._popupElement.querySelector(".popup__form");
        this._inputs = Array.from(this._form.querySelectorAll(".popup__edit"));
        this._submitButton = this._form.querySelector(".popup__save-btn");
    }
    _formSubmit(evt) {
        evt.preventDefault();
        this._formSubmitCallBack(this._getInputValues(), this._submitButton);
    }
    _getInputValues() {
        const data = Array.from(this._inputs).map(input => {
            return input.value;
        })
        return data;
    }
    close() {
        super.close();
        this._form.reset();
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", this._formSubmit);
    }
}