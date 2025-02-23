import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import popupWithForm from "../components/popupWithForm.js";
import userInfo from "../components/userInfo.js";
import popupWithImage from "../components/popupWithImage.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__form-error_active",
  errorClass: "modal__form-error",
};

const profileEdtBtn = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-modal");
const profileForm = editModal.querySelector(".modal__form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileInputName = document.querySelector("#js_input_name");
const profioleInputDescription = document.querySelector(
  "#js_input_description"
);
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;
const cardList = document.querySelector(".cards__list");

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardInputTitle = document.querySelector("#js_input_title");
const addCardInputLink = document.querySelector("#js_input_link");
const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const closeButtons = document.querySelectorAll(".modal__close");
const cardSelector = "#card__template";

// function handleSubmitEditForm(evt) {
//   evt.preventDefault();
//   profileTitle.textContent = profileInputName.value;
//   profileDescription.textContent = profioleInputDescription.value;
//   closeModal(editModal);
// }

// profileForm.addEventListener("submit", handleSubmitEditForm);

// function handleAddCardForm(evt) {
//   evt.preventDefault();
//   renderCard({
//     name: addCardInputTitle.value,
//     link: addCardInputLink.value,
//   });
//   closeModal(addCardModal);
//   evt.target.reset();

//   addCardFormValidator.disableSubmitButton();
// }

// addCardForm.addEventListener("submit", handleAddCardForm);

// closeButtons.forEach((button) => {
//   const modal = button.closest(".modal");
//   button.addEventListener("click", () => closeModal(modal));
// });

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", closeModalEsc);
//   modal.addEventListener("mousedown", closeModalOverlay);
// }

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closeModalEsc);
//   modal.removeEventListener("mousedown", closeModalOverlay);
// }

// function closeModalEsc(evt) {
//   if (evt.key === "Escape") {
//     const modalOpened = document.querySelector(".modal_opened");
//     closeModal(modalOpened);
//   }
// }

// function closeModalOverlay(evt) {
//   if (evt.target.classList.contains("modal")) {
//     closeModal(evt.target);
//   }
// }

// function handleCardImageClick(name, link) {
//   previewModalImage.src = link;
//   previewModalImage.alt = name;
//   previewModalCaption.textContent = name;

//   openModal(previewModal);
// }

// function renderCard(data) {
//   const cardElement = createCard(data);
//   cardList.prepend(cardElement);
// }

function createCard(data) {
  const card = new Card(data, "#card__template", (Title, url) => {
    imagePopup.setEventListeners();
  });
  return card.getCardElement();
}

//initialCards.forEach((data) => renderCard(data));

const editFormValidator = new FormValidator(settings, profileForm);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(settings, addCardForm);
addCardFormValidator.enableValidation();

const userData = new userInfo(".profile__title", ".profile__description");

const imagePopup = new popupWithImage({
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

const editProfilePopup = new popupWithForm(
  { popupSelector: "#edit-modal" },
  (formData) => {
    userData.setUserInfo({
      name: formData.name,
      description: formData.description,
    });
  }
);
editProfilePopup.setEventListeners();

const addCardPopup = new popupWithForm(
  { popupSelector: "#add-card-modal" },
  (formData) => {
    const newCard = createCard({
      name: formData.Title,
      link: formData.url,
    });
    cardSection.addItem(newCard, "prepend");
  }
);
addCardPopup.setEventListeners();

profileEdtBtn.addEventListener("click", () => {
  const currentUserData = userData.getUserInfo();
  profileInputName.value = currentUserData.name;
  profioleInputDescription.value = currentUserData.description;
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
  addCardFormValidator.resetValidation();
});
