function showInputError(formElement, inputElement, params) {
  const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(params.inputErrorClass);
  errorMessage.textContent = inputElement.validationMessage;
  errorMessage.classList.add(params.errorClass);
}

function hideInputError(formElement, inputElement, params) {
  const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(params.inputErrorClass);
  errorMessage.textContent = "";
  errorMessage.classList.remove(params.errorClass);
}

function checkInputValidity(formElement, inputElement, params) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
}

function toggleButtonState(inputElements, submitButton, params) {
  let foundInvalid = false;
  inputElements.forEach((inputElement) => {
    if (!inputElement.validity.valid) {
      foundInvalid = true;
    }
  });
  if (foundInvalid) {
    submitButton.classList.add(params.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(params.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(formElement, params) {
  const inputElements = [...formElement.querySelectorAll(params.inputSelector)];
  const submitButton = formElement.querySelector(params.submitButtonSelector);
  toggleButtonState(inputElements, submitButton, params);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(formElement, inputElement, params);
      toggleButtonState(inputElements, submitButton, params);
    });
  });
}

function enableValidation(params) {
  const formElements = [...document.querySelectorAll(params.formSelector)];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, params);
  });
}

const params = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__form-fieldset-type_error",
  errorClass: "modal__from-input_error",
};

enableValidation(params);
