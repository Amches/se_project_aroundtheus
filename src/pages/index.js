import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/API.js";
import PopupWithConfirmation from "../components/PopupConfirmation.js";
import {
  initialCards,
  settings,
  profileEdtBtn,
  profileForm,
  profileInputName,
  profileInputDescription,
  addCardButton,
  addCardForm,
  avatarEdtBtn,
  avatarEditForm,
  cardList,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a05557a7-2951-4010-9ddf-1cfa57b9c4e2",
    "Content-Type": "application/json",
  },
});
let cardSection;

api
  .getAppInfo()
  .then(([APIUserInfo, APICards]) => {
    userData.setProfileInfo({
      title: APIUserInfo.name,
      description: APIUserInfo.about,
      avatar: APIUserInfo.avatar,
    });
    cardSection = new Section(
      {
        items: APICards,
        renderer: renderCard,
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

const userData = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__picture"
);

const imagePopup = new PopupWithImage({ popupSelector: "#preview-modal" });
imagePopup.setEventListeners();

const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-modal",
  handleFormSubmit: handleEditFormSubmit,
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});
addCardPopup.setEventListeners();

const avatarEditPopup = new PopupWithForm({
  popupSelector: "#avatar-modal",
  handleFormSubmit: handleAvatarEditFormSubmit,
});
avatarEditPopup.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: "#delete-card-modal",
});
deleteCardPopup.setEventListeners();

const editFormValidator = new FormValidator(settings, profileForm);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(settings, addCardForm);
addCardFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(settings, avatarEditForm);
editAvatarFormValidator.enableValidation();

profileEdtBtn.addEventListener("click", () => {
  const currentUserData = userData.getUserInfo();
  profileInputName.value = currentUserData.name;
  profileInputDescription.value = currentUserData.description;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

function createCard(data) {
  const cardElement = new Card(
    {
      name: data.name,
      link: data.link,
      _id: data._id,
      isLiked: data.isLiked,
    },
    "#card__template",
    handleDeleteButton,
    handleLikeClick,
    handleCardImageClick
  );
  return cardElement.getCardElement();
}

function renderCard(data) {
  const card = createCard(data);
  cardSection.addItem(card);
}

avatarEdtBtn.addEventListener("click", () => {
  avatarEditPopup.open();
});

function handleLikeClick(card, isLiked, cardId) {
  if (!isLiked) {
    api
      .addCardLike(cardId)
      .then((res) => {
        card.setLikes(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .deleteCardLike(cardId)
      .then((res) => {
        card.setLikes(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function handleEditFormSubmit(data) {
  editProfilePopup.setLoading(true);
  api
    .setProfileInfo(data)
    .then(() => {
      userData.setUserInfo(data);
      editFormValidator.disableSubmitButton();
      editProfilePopup.clearInputs();
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfilePopup.setLoading(false);
    });
}

function handleAddCardFormSubmit(data) {
  addCardPopup.setLoading(true);
  api
    .createNewCard(data)
    .then((card) => {
      renderCard(card, cardList);
    })
    .then(() => {
      addCardFormValidator.disableSubmitButton();
      addCardPopup.clearInputs();
      addCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addCardPopup.setLoading(false);
    });
}

function handleAvatarEditFormSubmit(data) {
  avatarEditPopup.setLoading(true);
  api
    .setAvatar(data.link)
    .then((res) => {
      userData.setUserAvatar(res);
    })
    .then(() => {
      editAvatarFormValidator.disableSubmitButton();
      avatarEditPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarEditPopup.setLoading(false);
    });
}

function handleCardImageClick(link, name) {
  imagePopup.open(link, name);
}

function handleDeleteButton(cardId, card) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitFunc(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        card.remove();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
