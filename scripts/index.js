let initialCards = [
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

let profileEdtBtn = document.querySelector(".profile__edit-button");
let editModal = document.querySelector(".modal");
let closeModalBtn = editModal.querySelector(".modal__close");
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");
let profileInputTitle = document.querySelector("#js_input_name");
let profioleInputDescription = document.querySelector("#js_input_description");
let profileForm = editModal.querySelector(".modal__form");
let cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;
let cardList = document.querySelector(".cards__list");

function openEdit() {
  editModal.classList.add("modal_opened");
  profileInputTitle.value = profileTitle.textContent;
  profioleInputDescription.value = profileDescription.textContent;
}

profileEdtBtn.addEventListener("click", openEdit);

function closeEdit() {
  editModal.classList.remove("modal_opened");
}

closeModalBtn.addEventListener("click", closeEdit);

function submitEditForm(e) {
  e.preventDefault();
  profileTitle.textContent = profileInputTitle.value;
  profileDescription.textContent = profioleInputDescription.value;
  closeEdit();
}

profileForm.addEventListener("submit", submitEditForm);

function getCardElement(data) {
  let cardElement = cardTemplate.cloneNode(true);
  let cardImageELement = cardElement.querySelector(".card__image");
  let cardTitleElement = cardElement.querySelector(".card__title");
  cardImageELement.src = data.link;
  cardTitleElement.textContent = data.name;
  cardImageELement.alt = data.name;
  return cardElement;
}

initialCards.forEach((data) => {
  let cardElement = getCardElement(data);
  cardList.append(cardElement);
});
