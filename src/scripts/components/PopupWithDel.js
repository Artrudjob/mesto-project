import {
    Popup
} from "./Popup.js";


export class PopupWithDel extends Popup {
    constructor(popupElement, { formSubmitCallBack }) {
      super(popupElement);
      this._formSubmitCallBack = formSubmitCallBack;
      this._form = this._popupElement.querySelector(".popup__form");
      this._submit = this._submit.bind(this);
    }
  
    _submit(evt) {
      evt.preventDefault();
      this._formSubmitCallBack(this.data);
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener("submit", this._submit);
    }
  }