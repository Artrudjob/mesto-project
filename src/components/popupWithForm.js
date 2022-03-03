import {
    Popup
} from './popup';

export class PopupWithForm extends Popup {
    constructor(popupSection, popupSelector, callbackSubmitForm ) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._popupSection = popupSection;
    }

    _getInputValues() {
        return this._popupSection.querySelectorAll('.popup__edit')
    }
    
    setEventListeners(evt) {
        super.setEventListeners();
        this._popupSection.addEventListener('submit', this._callbackSubmitForm);
    }

    close() {
        super.close();
        
        this._getInputValues().forEach(element => {
            element.value = '';
        });
    }
}