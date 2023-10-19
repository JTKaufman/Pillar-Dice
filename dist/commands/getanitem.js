"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnItemReply = exports.createGetAnItemCommand = void 0;
const strings_1 = require("../utils/strings");
const lodash_random_1 = __importDefault(require("lodash.random"));
const Utils_1 = require("../utils/Utils");
const __1 = require("..");
function createGetAnItemCommand(commands) {
    //Adds '/getanitem' as a command
    commands === null || commands === void 0 ? void 0 : commands.create({
        name: strings_1.EN.Strings.command_name_getanitem,
        description: strings_1.EN.Strings.command_description_getanitem,
    });
}
exports.createGetAnItemCommand = createGetAnItemCommand;
function getAnItemReply(interaction) {
    //Messages channel with the item pulled unless all items have been pulled
    let itemPulled = getAnItem();
    if (__1.bagOfHolding.length === 0) {
        interaction.reply({
            content: strings_1.EN.Strings.command_reply_getanitem_empty,
        });
    }
    else if (itemPulled != null) {
        interaction.reply({
            content: (0, Utils_1.getAnItemReplyBuilder)(itemPulled),
        });
    }
    else {
        interaction.reply({
            content: strings_1.EN.Strings.command_reply_getanitem_empty,
        });
    }
}
exports.getAnItemReply = getAnItemReply;
function getAnItem() {
    let itemRoll = (0, lodash_random_1.default)(1, 20);
    if (__1.bagOfHolding.some(item => item.pulled === false)) {
        //Gets a random row from the bagOfHolding array to choose a good or bad item from that has not been pulled
        let itemIndex = (0, lodash_random_1.default)(0, __1.bagOfHolding.length - 1);
        while (__1.bagOfHolding[itemIndex].pulled === true) {
            itemIndex = (0, lodash_random_1.default)(0, __1.bagOfHolding.length - 1);
        }
        //Marks the item row as pulled so it is not pulled again
        __1.bagOfHolding[itemIndex].pulled = true;
        //Returns the good Item on a roll > 10 and Bad item on rolls <= 10
        if (itemRoll > 10) {
            return [__1.bagOfHolding[itemIndex].goodItemName, __1.bagOfHolding[itemIndex].goodItemDescription];
        }
        else {
            return [__1.bagOfHolding[itemIndex].badItemName, __1.bagOfHolding[itemIndex].badItemDescription];
        }
    }
    else {
        return;
    }
}
