export class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._popupCloseButton = this._popupElement.querySelector(
      ".popup__exit"
    );
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }
  setEventListeners(evt) {
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("mousedown", (evt) => {
      this._handleOverlayClose(evt);

    });
  }
  open() {
    document.addEventListener("keyup", this._handleEscClose);
    this._popupElement.classList.add("popup_opened");
  }
  close() {
    document.removeEventListener("keyup", this._handleEscClose);
    this._popupElement.classList.remove("popup_opened");
  }
}