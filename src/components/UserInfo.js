export default class UserInfo {
  constructor(nameSelector, descriptionSelector, pictureSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(pictureSelector);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
      avatar: this._avatar,
    };
  }
  setUserInfo({ name, description }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
