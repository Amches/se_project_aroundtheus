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

function openEdit() {
  editModal.classList.add("modal_opened");
  profileInputName.value = profileTitle.textContent;
  profioleInputDescription.value = profileDescription.textContent;
}

profileEdtBtn.addEventListener("click", openEdit);

function closeEdit() {
  editModal.classList.remove("modal_opened");
}

closeEditModalBtn.addEventListener("click", closeEdit);

function handleSubmitEditForm(e) {
  e.preventDefault();
  profileTitle.textContent = profileInputName.value;
  profileDescription.textContent = profioleInputDescription.value;
  closeEdit();
}

profileForm.addEventListener("submit", handleSubmitEditForm);

function getCardElement(data) {
  let cardElement = cardTemplate.cloneNode(true);
  let cardImageELement = cardElement.querySelector(".card__image");
  let cardTitleElement = cardElement.querySelector(".card__title");
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

  return cardElement;
}
//original cards
initialCards.forEach((data) => addUsersCard(data, cardList));

//user's cards
//cahnged the order of original cards, because the new ones should be in the beginning
function addUsersCard(data, list) {
  let cardElement = getCardElement(data);
  list.prepend(cardElement);
}

addCardButton.addEventListener("click", openAddCard);

function openAddCard() {
  addCardModal.classList.add("modal_opened");
}

closeAddCardModalBtn.addEventListener("click", closeAddCard);

function closeAddCard() {
  addCardModal.classList.remove("modal_opened");
}

function handleAddCardForm(e) {
  e.preventDefault();
  const name = addCardInputTitle.value;
  const link = addCardInputLink.value;
  addUsersCard({ name, link }, cardList);
  closeAddCard();
}

addCardForm.addEventListener("submit", handleAddCardForm);
