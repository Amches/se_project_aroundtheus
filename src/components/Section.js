export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedCards = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._renderedCards.forEach((item) => {
      this._renderer(item, this._container);
    });
  }
  addItem(item) {
    this._container.prepend(item);
  }
}
