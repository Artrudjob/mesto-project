import '../index.css';
//константы вынесенны в отдельный файл для удобства
import {
  validationConfig,
  profileEditPopup,
  avataPopup,
  profileEditBtn,
  profileAvatarBtn,
  addCardPopup,
  deletePopup,
  profileCareer,
  profileName,
  profileAvatar,
  cardTemplate,
  imagePopup,
  profileNameInput,
  profileCareerInput,
  profileAddBtn,
  cardsContainer,
  popupBtnCreate,
  popupBtnSave,
  popupAvatarBtnSave
} from './constants.js'
import {
  Api
} from './Api.js';
import {
  FormValidator
} from './FormValidator.js';
import {
  UserInfo
} from './UserInfo.js';
import {
  Card,
} from './Сard.js';
import {
  PopupWithImage
} from './PopupWithImage.js';
import {
  PopupWithForm
} from './PopupWithForm.js';
import {
  Section
} from './Section.js';
import {
  PopupWithDel as PopupWithDel
} from './PopupWithDel.js';

//авторизация
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6/',
  headers: {
    authorization: 'c6ea2481-28ed-4e6a-9bbe-85a531661bf0',
    'Content-Type': 'application/json'
  }
})
//вспомогательные переменные
let meId
let addLikeCard
let removeLikeCard;
//включение валидации
const formValidatorAvatar = new FormValidator(avataPopup, validationConfig);
const formValidatorEdit = new FormValidator(profileEditPopup, validationConfig);
const formValidatorAdd = new FormValidator(addCardPopup, validationConfig);

formValidatorAvatar.enableValidation();
formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();
//получение данных
const initialData = [api.getInfo(), api.getInitialCards()];
Promise.all(initialData)
  .then(([userData, cards]) => {
    meId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    section.renderItems(cards.reverse());
  })
  .catch((err) => console.log(err));
//фото во весь экран
const popupWithImage = new PopupWithImage(imagePopup);
popupWithImage.setEventListeners();

const openImagePopup = (evt) => {
  const data = {
    image: evt.target.src,
    text: evt.target.closest(".card").querySelector(".card__text").textContent,
  };
  popupWithImage.open(data);
};
//удаление карточки
const popupWithDel = new PopupWithDel(deletePopup, {
  formSubmitCallBack: (data) => {
    api.deleteCard(data.cardId).then(() => {
        data.card.remove()
        popupWithDel.close();
      })
      .catch((err) => console.log(err)).finally(popupWithDel.close())
  },
});
popupWithDel.setEventListeners();
const deleteCard = (data) => {
  popupWithDel.data = data;
  popupWithDel.open();
};
//Создание карточки
const createCard = (data) => {
  const card = new Card(
    data,
    '#card',
    meId,
    openImagePopup,
    deleteCard,
    (addLikeCard = (data) => {
      return api.addLikeCard(data);
    }),
    (removeLikeCard = (data) => {
      return api.removeLikeCard(data);
    })
  );
  const cardElement = card.createCard(data);
  return cardElement;
};
const section = new Section({
    renderItems: (data) => {
      section.addItem(createCard(data));
    },
  },
  cardsContainer
);
//редактирования профиля
const userInfo = new UserInfo({
  profileName,
  profileCareer,
  profileAvatar
});
const editPopup = new PopupWithForm(profileEditPopup, {
  formSubmitCallBack: (data, button) => {
    api
      .editProfile(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        editPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupBtnSave.textContent = 'Сохраненть';
      });
    popupBtnSave.textContent = 'Сохранение...';
  },
});
editPopup.setEventListeners();
profileEditBtn.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileNameInput.value = data.name;
  profileCareerInput.value = data.job;
  editPopup.open();
});
//редактирование фото профиля
const avatarEdit = new PopupWithForm(avataPopup, {
  formSubmitCallBack: (data, button) => {
    api
      .editAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res);
        avatarEdit.close();
        formValidatorAvatar.disableButton();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupAvatarBtnSave.textContent = 'Сохранить';
      });
    popupAvatarBtnSave.textContent = 'Сохранение...';

  },
});
avatarEdit.setEventListeners();
profileAvatarBtn.addEventListener("click", () => {
  avatarEdit.open();
});
//Попап добавления карточки
const addNewCardPopup = new PopupWithForm(addCardPopup, {
  formSubmitCallBack: (data) => {
    const card = data
    api.addNewCard(card)
      .then((res) => {
        section.addItem(createCard(res), true);
        addNewCardPopup.close();
        formValidatorAdd.disableButton();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupBtnCreate.textContent = 'Создать';
      });
    popupBtnCreate.textContent = 'Создание...';
  },
});
addNewCardPopup.setEventListeners();
profileAddBtn.addEventListener("click", () => {
  addNewCardPopup.open();
});