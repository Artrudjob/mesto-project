export class Section {
    constructor(renderer, containerSelector) {
        this._dataRenderer = renderer;
        this._containerSelector = containerSelector;
    }

    renderItems(arrCard) {
        arrCard.reverse().forEach(element => {
            this._dataRenderer(element);
        });
    }

    addItem(cardTemplate) {
        this._containerSelector.prepend(cardTemplate)
    }
}