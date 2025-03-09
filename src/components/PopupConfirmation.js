import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._form = this._modalElement.querySelector(".modal__form");
    this._submitButton = this._form.querySelector(".modal__button");
    this._submitButtonTextContent = this._submitButton.textContent;
  }

  setSubmitFunc(SubmitFunc) {
    this._SubmitFunc = SubmitFunc;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.setSubmitFunc();
    });
  }

  setLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonTextContent;
    }
  }
}
