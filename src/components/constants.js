//работа с картами
export const cardsContainer = document.querySelector('.cards');
export const cardTemplate = document.querySelector("#card");
//валидация
export const validationConfig = {
    inputSelector: '.popup__edit',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disabled',
    inputErrorClass: 'popup__error_visible',
    errorClass: 'popup__edit_visible',
}
//информация профиля
export const profileName = document.querySelector('.profile__name');
export const profileCareer = document.querySelector('.profile__career');
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileEditPopup = document.querySelector('#popup-edit');
export const profileNameInput = profileEditPopup.querySelector('#user-name-field');
export const profileCareerInput = profileEditPopup.querySelector('#user-career-field');
//кнопки
export const profileEditBtn = document.querySelector('.profile__edit');
export const profileAvatarBtn = document.querySelector('.profile__avatar-edit');
export const profileAddBtn = document.querySelector('.profile__add');
export const popupBtnCreate = document.querySelector('#create-button');
export const popupBtnSave = document.querySelector('#save-button');
export const popupAvatarBtnSave = document.querySelector('#save-avatar-btn');
//popups
export const addCardPopup = document.querySelector("#popup-add");
export const avataPopup = document.querySelector('#popup-avatar');
export const deletePopup = document.querySelector('#popup-delete-card');
export const imagePopup = document.querySelector("#popup-img");

