export class Section {
    constructor({
        renderItems
    }, containerSelector) {
        this._renderer = renderItems;
        this._container = containerSelector;
    }
    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
    }
    addItem(cardTemplate) {
        this._container.prepend(cardTemplate);
    }
}