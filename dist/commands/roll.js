"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRollReply = exports.createRollCommand = void 0;
const strings_1 = require("../utils/strings");
const lodash_random_1 = __importDefault(require("lodash.random"));
function createRollCommand(commands) {
    //Adds '/roll' as a command
    commands === null || commands === void 0 ? void 0 : commands.create({
        name: strings_1.EN.Strings.Command_name_roll,
        description: strings_1.EN.Strings.command_description_roll,
    });
}
exports.createRollCommand = createRollCommand;
function getRollReply(interaction) {
    //Messages channel with players roll between 1-20
    interaction.reply({
        content: strings_1.EN.Strings.command_reply_roll + (0, lodash_random_1.default)(1, 20),
    });
}
exports.getRollReply = getRollReply;
