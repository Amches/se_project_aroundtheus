import FormValidator from "./FormValidator.js";
import Card from "./card.js";

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
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);

const profileEdtBtn = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-modal");
const closeEditModalBtn = editModal.querySelector(".modal__close");
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
const closeAddCardModalBtn = addCardModal.querySelector(".modal__close");
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardInputTitle = document.querySelector("#js_input_title");
const addCardInputLink = document.querySelector("#js_input_link");
const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const closePreviewModalButton = previewModal.querySelector(".modal__close");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const closeButtons = document.querySelectorAll(".modal__close");

profileEdtBtn.addEventListener("click", () => {
  profileInputName.value = profileTitle.textContent;
  profioleInputDescription.value = profileDescription.textContent;
  openModal(editModal);
});

function handleSubmitEditForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileInputName.value;
  profileDescription.textContent = profioleInputDescription.value;
  closeModal(editModal);
}

profileForm.addEventListener("submit", handleSubmitEditForm);

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageELement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__trash-button");

  cardImageELement.src = data.link;
  cardTitleElement.textContent = data.name;
  cardImageELement.alt = data.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageELement.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;
  });

  return cardElement;
}
//original cards
initialCards.forEach((data) => addUsersCard(data, cardList));

//user's cards
//cahnged the order of original cards, because the new ones should be in the beginning
function addUsersCard(data, list) {
  const cardElement = getCardElement(data);
  list.prepend(cardElement);
}

addCardButton.addEventListener("click", () => openModal(addCardModal));

function handleAddCardForm(evt) {
  evt.preventDefault();
  const name = addCardInputTitle.value;
  const link = addCardInputLink.value;
  addUsersCard({ name, link }, cardList);
  closeModal(addCardModal);
  evt.target.reset();
}

addCardForm.addEventListener("submit", handleAddCardForm);

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("mousedown", closeModalOverlay);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
  modal.removeEventListener("mousedown", closeModalOverlay);
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
}

function closeModalOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}
