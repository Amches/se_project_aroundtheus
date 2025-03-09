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
} from "../utils/constants.js";

const editFormValidator = new FormValidator(settings, profileForm);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(settings, addCardForm);
addCardFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(settings, avatarEditForm);
editAvatarFormValidator.enableValidation();

const userData = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__picture"
);

const imagePopup = new PopupWithImage({
  popupSelector: "#preview-modal",
});
imagePopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);
cardSection.renderItems();

const editProfilePopup = new PopupWithForm(
  { popupSelector: "#edit-modal" },
  (formData) => {
    userData.setUserInfo({
      name: formData.name,
      description: formData.description,
    });
  }
);
editProfilePopup.setEventListeners();

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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "8625c637-5d20-4d8f-98ba-8439d6bb0fbb",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((cardsData) => {
    cardSection.renderItems(cardsData);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getUserInfo()
  .then((result) => {
    userData.setUserInfo({
      name: result.name,
      description: result.description,
    });
    userData.setAvatar(result.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

function handleDeleteButton(card) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitFunc(() => {
    api
      .deleteCard(card.getId())
      .then(() => {
        card.deleteCard();
        deleteCardPopup.close();
      })
      .catch((error) => {
        console.error(
          "An error occurred while trying to delete the card: ${err}"
        );
      });
  });
}

function createCard(data) {
  const card = new Card(
    {
      name: data.name,
      link: data.link,
      _id: data._id,
      isLiked: data.isLiked,
      likes: data.likes,
    },
    "#card__template",
    handleDeleteButton,
    handleLikeClick
  );
  return card.getCardElement();
}

function handleLikeClick(card) {
  const isLiked = card.isLiked();
  api
    .changeCardLikeStatus(card._cardId, isLiked)
    .then((updatedCard) => {
      card.setLikes(updatedCard.isLiked);
    })
    .catch((err) => {
      console.error(
        `An error occurred while trying to update the like status: ${err}`
      );
    });
}

const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  addCardPopup.setLoading(true);
  const newData = { name: formData.title, link: formData.url };
  api
    .createNewCard(newData)
    .then((result) => {
      renderCard(result);
      addCardPopup.close();
      addCardForm.reset();
      addCardFormValidator.disableButton();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addCardPopup.setLoading(false);
    });
});
addCardPopup.setEventListeners();

function renderCard(data) {
  const card = createCard(data);
  cardSection.addItem(card);
}

const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    editProfileModal.setLoading(true);
    api
      .setProfileInfo({
        name: formData.title,
        about: formData.description,
      })
      .then((result) => {
        userData.setUserInfo({
          name: result.name,
          description: result.description,
        });
        profileForm.reset();
        editProfileModal.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        editProfileModal.setLoading(false);
      });
  }
);
editProfileModal.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation("#delete-card-modal");
deleteCardPopup.setEventListeners();

const avatarEditModal = new PopupWithForm("#avatar-edit-modal", (formData) => {
  avatarEditModal.setLoading(true);
  api
    .setAvatar(formData.avatar)
    .then((result) => {
      userData.setAvatar(result.avatar);
      avatarEditModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarEditModal.setLoading(false);
    });
});
avatarEditModal.setEventListeners();

avatarEdtBtn.addEventListener("click", () => {
  avatarEditModal.open();
});
