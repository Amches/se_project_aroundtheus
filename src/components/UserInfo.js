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
  setUserInfo({ title, description }) {
    this._nameElement.textContent = title;
    this._descriptionElement.textContent = description;
  }

  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }

  setProfileInfo({ title, description, avatar }) {
    this.setUserInfo({ title, description });
    this.setUserAvatar({ avatar });
  }
}
