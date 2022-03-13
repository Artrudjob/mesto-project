export class FormValidator {
    constructor(formSelector, config) {
        this._formSelector = formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
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
    _checkInputValidity(inputElement) {
        const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`); //Находим элемент ошибки (span)
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
    _hasInvalidInput() {
        return this._inputList.some(inputElement => {
            return !inputElement.validity.valid;
        });
    };

    //кнопка в состояние disable
    disableButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    };

    //кнопка в состояние undisable
    _enablaButton() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
    };

    //Переключение состояния кнопки
    _toggleButtonState() {
        //Если есть хотя бы 1 инвалидный инпут
        if (this._hasInvalidInput(this._inputList)) {
            //Делаем кнопку не активной
            this.disableButton();
        } else {
            //Делаем кнопку активной
            this._enablaButton();
        }
    };

    _setEventListeners() {
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });

        this._toggleButtonState();
    };

    enableValidation() {
        this._formSelector.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        this._setEventListeners();
    };
}