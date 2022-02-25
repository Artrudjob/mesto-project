/* const profileEditPopup = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const popupFormAdd = document.querySelector('#popup-form-add');
const popupAvatar = document.querySelector('#popup-avatar');
const popupDeleteCard = document.querySelector('#popup-delete-card');

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', closeByKeyPopup); 
    document.addEventListener('mousedown', clickClosePopupForm);
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', closeByKeyPopup); 
    document.removeEventListener('mousedown', clickClosePopupForm);
}

function closeByKeyPopup(event) {
      if (event.code === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
      }
}

function clickClosePopupForm(event) {
      if (event.target.classList.contains('popup')) {
        closePopup(event.target);
      }
}

export { profileEditPopup, popupAdd, popupFormAdd, popupAvatar, popupDeleteCard, openPopup, closePopup, closeByKeyPopup, clickClosePopupForm }; */