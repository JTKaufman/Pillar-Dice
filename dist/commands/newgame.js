"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewGameReply = exports.createNewGameCommand = void 0;
const strings_1 = require("../utils/strings");
const __1 = require("..");
function createNewGameCommand(commands) {
    //Adds '/newgame' as a command
    commands === null || commands === void 0 ? void 0 : commands.create({
        name: strings_1.EN.Strings.command_name_newgame,
        description: strings_1.EN.Strings.command_description_newgame,
    });
}
exports.createNewGameCommand = createNewGameCommand;
function getNewGameReply(interaction) {
    //Resets the pulled property of each item in the bag of holding array
    //Then messages channel to notify the players the bag of holding is ready for a new game
    if (__1.bagOfHolding.length === 0) {
        interaction.reply({
            content: strings_1.EN.Strings.command_reply_getanitem_empty,
        });
    }
    else {
        resetBagOfHolding();
        interaction.reply({
            content: strings_1.EN.Strings.command_reply_newgame,
        });
    }
}
exports.getNewGameReply = getNewGameReply;
function resetBagOfHolding() {
    __1.bagOfHolding.forEach((item) => {
        item.pulled = false;
    });
}
