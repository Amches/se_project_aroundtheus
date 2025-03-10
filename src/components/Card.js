class Card {
  constructor(
    data,
    cardSelector,
    handleCardImageClick,
    handleDeleteButton,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeClick = handleLikeClick;
    this._handleCardImageClick = handleCardImageClick;
  }
  _setEventListeners() {
    this._cardImageEl.addEventListener("click", () => {
      this._handleCardImageClick(this._link, this._name);
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this, this._isLiked, this._id);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton(this._id, this._cardElement);
    });
  }

  getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._deleteButton = this._cardElement.querySelector(".card__trash-button");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this.setLikes(this._isLiked);
    this._setEventListeners();
    return this._cardElement;
  }

  _updateLikes() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  getId() {
    return this._cardId;
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  setLikes(isLiked) {
    this._isLiked = isLiked;
    this._updateLikes();
  }
}

export default Card;
