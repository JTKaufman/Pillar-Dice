"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmptyBagOfHoldingReply = exports.createEmptyBagOfHoldingCommand = void 0;
const strings_1 = require("../utils/strings");
const __1 = require("..");
function createEmptyBagOfHoldingCommand(commands) {
    //Adds '/emptybagofholding' as a command
    commands === null || commands === void 0 ? void 0 : commands.create({
        name: strings_1.EN.Strings.command_name_emptybagofholding,
        description: strings_1.EN.Strings.command_description_emptybagofholding,
    });
}
exports.createEmptyBagOfHoldingCommand = createEmptyBagOfHoldingCommand;
function getEmptyBagOfHoldingReply(interaction) {
    //Empties the bag of holding array and notifies discord channel
    emptyBagOfHolding();
    interaction.reply({
        content: strings_1.EN.Strings.command_reply_emptybagofholding,
    });
}
exports.getEmptyBagOfHoldingReply = getEmptyBagOfHoldingReply;
function emptyBagOfHolding() {
    __1.bagOfHolding.length = 0;
}
