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
        this._inputList = Array.from(this._popupElement.querySelectorAll(".popup__edit"));
        this._submitButton = this._form.querySelector(".popup__save-btn");
    }
    _formSubmit(evt) {
        evt.preventDefault();
        this._getInputValues();
        this._formSubmitCallBack(this._getInputValues(), this._submitButton);
    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
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