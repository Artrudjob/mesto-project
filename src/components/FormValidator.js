export class FormValidator {
    constructor(formSelector, config) {
        this._formSelector = formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
    }

    //Показываем ошибку
    _showInputError(inputElement, errorElement, errorMessage) {
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    }

    //Скрываем ошибку
    _hideInputError(inputElement, errorElement) {
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    //Проверка валидности 
    _checkInputValidity(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //Находим элемент ошибки (span)
        //Если свойство valid == true, значит инпут валидный
        if (inputElement.validity.valid) {
            //ошибок нет
            this._hideInputError(inputElement, errorElement);
        } else {
            //ошибки есть
            this._showInputError(inputElement, errorElement, inputElement.validationMessage);
        }
    };

    //Проверяет имеются ли инвалидные импуты
    _hasInvalidInput(inputList) {
        return inputList.some(inputElement => {
            return !inputElement.validity.valid;
        });
    };

    //кнопка в состояние disable
    disableButton(buttonElement) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
    };

    //кнопка в состояние undisable
    _enablaButton(buttonElement) {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.disabled = false;
    };

    //Переключение состояния кнопки
    _toggleButtonState(formElement, inputList) {
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        //Если есть хотя бы 1 инвалидный инпут
        if (this._hasInvalidInput(inputList)) {
            //Делаем кнопку не активной
            this.disableButton(buttonElement, this._inactiveButtonClass);
        } else {
            //Делаем кнопку активной
            this._enablaButton(buttonElement, this._inactiveButtonClass);
        }
    };

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector)); //Находим все input внутри формы
        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(this._formSelector, inputElement, this._inputErrorClass, this._errorClass);
                this._toggleButtonState(this._formSelector, inputList, this._submitButtonSelector, this._inactiveButtonClass);
            });
        });

        this._toggleButtonState(this._formSelector, inputList, this._submitButtonSelector, this._inactiveButtonClass);
    };

    enableValidation() {
        this._formSelector.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        this._setEventListeners(this._formSelector);
    };
}