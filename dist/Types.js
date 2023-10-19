"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemParse = void 0;
function itemParse(itemArray) {
    if (itemArray.length != 4) {
        console.log('Not enough parameters.');
        return;
    }
    let item = {
        goodItemName: itemArray[0],
        goodItemDescription: itemArray[1],
        badItemName: itemArray[2],
        badItemDescription: itemArray[3],
        pulled: false
    };
    return item;
}
exports.itemParse = itemParse;
