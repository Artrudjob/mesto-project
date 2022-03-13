export class Section {
    constructor({
        renderItems
    }, container) {
        this._renderer = renderItems;
        this._container = container;
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