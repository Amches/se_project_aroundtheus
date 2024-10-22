let card1 = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};
let card2 = {
  name: "Lake Louise",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
};
let card3 = {
  name: "Bald Mountains",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
};
let card4 = {
  name: "Latemar",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
};
let card5 = {
  name: "Vanoise National Park",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
};
let card6 = {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
};

let initialCards = [card1, card2, card3, card4, card5, card6];

console.log(initialCards);

let profileEdtBtn = document.querySelector(".profile__edit-button");
let editModal = document.querySelector(".modal");
let closeModalBtn = editModal.querySelector(".modal__close");
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");
let profileInputTitle = document.querySelector("#js_input_name");
let profioleInputDescription = document.querySelector("#js_input_description");
let saveModalBtn = editModal.querySelector(".modal__form");
let cardTemplate = document.querySelector("#card__template").content;

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

saveModalBtn.addEventListener("submit", submitEditForm);

function getCardElement(data) {
  for (let i = 0; i < data.length; i++) {
    let cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector(".card__image").src = data[i].link;
    cardElement.querySelector(".card__title").textContent = data[i].name;
    cardList.append(cardElement);
  }
}
