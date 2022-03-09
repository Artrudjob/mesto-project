import {
    Popup
} from './Popup';

export class PopupWithForm extends Popup {
    constructor(popupSection, popupSelector, callbackSubmitForm ) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._popupSection = popupSection;
    }

    getInputValues() {
        //return this._popupSection.querySelectorAll('.popup__edit')
        return Array.from(this._popupSection.querySelectorAll('.popup__edit')).map(item => {
            return item.value;
        })
    }
    
    setEventListeners(evt) {
        super.setEventListeners();
        this._popupSection.addEventListener('submit', this._callbackSubmitForm);
    } 

    close() {
        super.close();
        Array.from(document.querySelectorAll('.popup__form')).forEach(form => {
            form.reset();
        })
        
        /*super.close();
        this._getInputValues().forEach(element => {
            element.value = '';
        });*/
    }
}