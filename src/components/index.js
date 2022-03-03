import '../index.css';
import {
  api
} from './api.js';
import {
  popupAvatar,
  popupProfileEdit,
  popupCardAdd,
  popupImg,
  popupDeleteCard
} from './popup.js';
import {
  formValidator
} from './validate.js';
import {
  userInfo
} from './UserInfo.js';
import {
  Card,
  itemCard,
  itemCardId
} from './card.js';
import {
  PopupWithImage
} from './PopupWithImage.js';
import {
  PopupWithForm
} from './popupWithForm.js';
import {
  Section
} from './section.js';
const cardsContainer = document.querySelector('.cards');
const profileEditPopup = document.querySelector('#popup-edit');
const sectionPopupAdd = document.querySelector('#popup-add');
const popupContainer = profileEditPopup.querySelector('.popup__container');
const profileEdit = document.querySelector('.profile__edit');
const profileAdd = document.querySelector('.profile__add');
const profileAvatar = document.querySelector('.profile__avatar-edit');
const profileName = document.querySelector('.profile__name');
const profileCareer = document.querySelector('.profile__career');
const profileAvatarImg = document.querySelector('.profile__avatar');
const popupExit = popupContainer.querySelector('.popup__exit');
const SectionPopupAvatar = document.querySelector('#popup-avatar');
const closeAvatar = SectionPopupAvatar.querySelector('.popup__exit');
const exitBtn = document.querySelector('#exit-button');
const popupDelCard = document.querySelector('#popup-delete-card');
const agreeDeleteCard = popupDelCard.querySelector('#delete-button');
const closeDelCard = popupDelCard.querySelector('.popup__exit');
const popupFormAvatar = SectionPopupAvatar.querySelector('.popup__form');
const popupFormEdit = document.querySelector('#popup__form-id');
const popupExitImg = document.querySelector('.popup__exit-img');
const popupUserName = profileEditPopup.querySelector('#user-name-field');
const popupUserCareer = profileEditPopup.querySelector('#user-career-field');
const userNameField = document.querySelector('#user-name-field');
const userCareerField = document.querySelector('#user-career-field');
const imgNameField = document.querySelector('#img-name-field');
const imgLinkField = document.querySelector('#img-link-field');
const imgAvatarField = SectionPopupAvatar.querySelector('.popup__edit');
const popupBtnCreate = document.querySelector('#create-button');
const popupBtnSave = document.querySelector('#save-button');
const popupAvatarBtnSave = SectionPopupAvatar.querySelector('#save-avatar-btn');
const popupFormAdd = document.querySelector('#popup-form-add');
const popupWithImage = new PopupWithImage(document.querySelector('#popup-img'), document.querySelector('.popup__img'));
const popupAvatarForm = new PopupWithForm(popupFormAvatar, SectionPopupAvatar, handleAvatarSubmit);
const popupEditForm = new PopupWithForm(popupFormEdit, profileEditPopup, handleUserInfoFormSubmit);
const popupAddForm = new PopupWithForm(popupFormAdd, sectionPopupAdd, handleCardInfoFormSubmit);
const section = new Section(renderCard, cardsContainer);


let meId;
let idCard;

api.getAppInfo()
  .then(([user, cards]) => {
    userInfo.getUserInfo();
    changeAvatar(profileAvatarImg, user.avatar);
    meId = user._id;

    const createdCards = createCards(cards);
    section.renderItems(createdCards);
    idCard = cards._id;
  })
  .catch(err => console.log(`Что-то пошло не так: ${err}`))

formValidator.enableValidation();

function createCards(arrCard) {
  return arrCard.map(element => {
    const data = {
      name: element.name,
      link: element.link,
      likesCount: element.likes.length,
      ownerId: element.owner._id,
      likes: element.likes,
      cardId: element._id
    }
    return new Card(data);
  });
}

function renderCard(card) {
  card.renderCard();
}

function changeElementTextContent(elementDOM, objValue) {
  const element = elementDOM;
  element.textContent = objValue;
}

function changeAvatar(elementDOM, objValue) {
  const element = elementDOM;
  element.src = objValue;
}

function fillEditForm() {
  popupUserName.setAttribute('value', profileName.textContent);
  popupUserCareer.setAttribute('value', profileCareer.textContent);
}

function deleteCard(card) {
  api.deleteUserCard(itemCardId)
    .then(() => {
      popupDeleteCard.close();
      card.remove();
    })
    .catch(err => console.log(`Что-то пошло не так: ${err}`))
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const avatarLink = imgAvatarField.value;

  api.updateAvatarUser(avatarLink)
    .then(() => {
      changeAvatar(profileAvatarImg, avatarLink);
      popupAvatarForm.close();
    })
    .catch(err => console.log(`Что-то пошло не так: ${err}`))
    .finally(() => {
      popupAvatarBtnSave.textContent = 'Сохранить';
    })
  popupAvatarBtnSave.textContent = 'Сохранение...';
}

function handleUserInfoFormSubmit(evt) {
  evt.preventDefault();
  popupBtnSave.textContent = 'Сохранение...';
  userInfo.setUserInfo(userNameField.value, userCareerField.value);
  popupBtnSave.textContent = 'Сохранить';
  popupEditForm.close();
}

function handleCardInfoFormSubmit(evt) {
  evt.preventDefault();

  api.addNewCard(imgNameField.value, imgLinkField.value)
    .then((card) => {
      const data = {
        name: card.name,
        link: card.link,
        likesCount: card.likes.length,
        ownerId: card.owner._id,
        likes: card.likes,
        cardId: card._id
      }

      const newCard = new Card(data);
      newCard.renderCard()
      formValidator.disableButton(popupBtnCreate);
      popupAddForm.close();
      popupFormAdd.reset();
    })
    .catch(err => console.log(`Что-то пошло не так: ${err}`))
    .finally(() => {
      popupBtnCreate.textContent = 'Создать';
    });
  popupBtnCreate.textContent = 'Создание...';
}


profileAvatar.addEventListener('click', function () {
  popupAvatar.open()
});
profileEdit.addEventListener('click', function () {
  popupProfileEdit.open()
});
profileEdit.addEventListener('click', fillEditForm);
profileAdd.addEventListener('click', function () {
  popupCardAdd.open()
});

closeAvatar.addEventListener('click', function () {
  popupAvatar.close()
});
popupExit.addEventListener('click', function () {
  popupProfileEdit.close()
});
exitBtn.addEventListener('click', function () {
  popupCardAdd.close()
});
popupExitImg.addEventListener('click', function () {
  popupImg.close()
});
closeDelCard.addEventListener('click', function () {
  popupDeleteCard.close()
});

agreeDeleteCard.addEventListener('click', () => {
  deleteCard(itemCard)
});
popupAvatarForm.setEventListeners();
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();

export {
  meId,
  idCard,
  popupBtnCreate,
  popupBtnSave,
  popupAvatarBtnSave,
  changeElementTextContent,
  changeAvatar,
  popupWithImage
}