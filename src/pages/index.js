import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  initialCards,
  settings,
  profileEdtBtn,
  profileForm,
  profileInputName,
  profioleInputDescription,
  addCardButton,
  addCardForm,
} from "../utils/constants.js";

function createCard(data) {
  const card = new Card(data, "#card__template", () => {
    imagePopup.open(data);
  });
  return card.getCardElement();
}

const editFormValidator = new FormValidator(settings, profileForm);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(settings, addCardForm);
addCardFormValidator.enableValidation();

const userData = new UserInfo(".profile__title", ".profile__description");

const imagePopup = new PopupWithImage({
  popupSelector: "#preview-modal",
});
imagePopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem);
      cardSection.addItem(cardElement);
    },
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

const addCardPopup = new PopupWithForm(
  { popupSelector: "#add-card-modal" },
  (formData) => {
    const newCard = createCard({
      name: formData.Title,
      link: formData.url,
    });
    cardSection.addItem(newCard, "prepend");
    addCardForm.reset();
    addCardFormValidator.disableSubmitButton();
  }
);
addCardPopup.setEventListeners();

profileEdtBtn.addEventListener("click", () => {
  const currentUserData = userData.getUserInfo();
  profileInputName.value = currentUserData.name;
  profioleInputDescription.value = currentUserData.description;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
