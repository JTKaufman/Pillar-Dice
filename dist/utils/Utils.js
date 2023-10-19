"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnItemReplyBuilder = void 0;
//String building helper function for getAnItem reply content
function getAnItemReplyBuilder(itemPulled) {
    let reply = 'You got ' + itemPulled[0] + '! This item has the following properties: ' + itemPulled[1];
    return reply;
}
exports.getAnItemReplyBuilder = getAnItemReplyBuilder;
