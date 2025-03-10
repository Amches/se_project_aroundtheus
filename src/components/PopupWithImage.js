import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._modalImage = this._popupElement.querySelector(".modal__image");
    this._modalCaption = this._popupElement.querySelector(".modal__caption");
  }

  open(link, name) {
    this._modalImage.src = link;
    this._modalImage.alt = name;
    this._modalCaption.textContent = name;
    super.open();
  }
}
