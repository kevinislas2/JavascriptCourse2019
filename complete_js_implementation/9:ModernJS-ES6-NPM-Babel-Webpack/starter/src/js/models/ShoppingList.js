"use strict";

import uniqid from 'uniqid';

export default class ShoppingList {
    constructor() {
        this.items = new Map();
    };

    addItem(count, unit, ingredient) {

        let item = {
            count,
            unit,
            ingredient
        };
        let key = uniqid();
        this.items.set(key, item);
        return [item, key];
    };

    deleteItem(id) {

        if(this.items.has(id)) {
            this.items.delete(id);
        };
    };

    updateCount(id, newCount) {

        if(this.items.has(id)) {
            let item = this.items.get(id);
            item.count = newCount;
            this.items.set(id, item);
        };
    };

    isEmpty() {
        return this.items.size === 0;
    };
};