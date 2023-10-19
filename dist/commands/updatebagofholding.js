"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdateBagOfHoldingReply = exports.createUpdateBagOfHoldingCommand = void 0;
const builders_1 = require("@discordjs/builders");
const strings_1 = require("../utils/strings");
const Types_1 = require("../Types");
const __1 = require("..");
const fetch = (url, init) => Promise.resolve().then(() => __importStar(require("node-fetch"))).then(({ default: fetch }) => fetch(url, init));
function createUpdateBagOfHoldingCommand(commands) {
    var guildCommand = new builders_1.SlashCommandBuilder()
        .setName(strings_1.EN.Strings.command_name_updatebagofholding)
        .setDescription(strings_1.EN.Strings.command_description_updatebagofholding)
        .addAttachmentOption(option => option.setName("items")
        .setDescription("The file containg the list of items to add to the bag of holding.")
        .setRequired(true));
    //Adds '/getanitem' as a command
    commands === null || commands === void 0 ? void 0 : commands.create(guildCommand.toJSON());
}
exports.createUpdateBagOfHoldingCommand = createUpdateBagOfHoldingCommand;
function getUpdateBagOfHoldingReply(interaction) {
    //updateBagOfHolding(interaction)
    updateBagOfHolding(interaction);
    interaction.reply({
        content: strings_1.EN.Strings.updated_bag_of_holding,
    });
}
exports.getUpdateBagOfHoldingReply = getUpdateBagOfHoldingReply;
function updateBagOfHolding(interaction) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const file = (_a = interaction.options.getAttachment('items')) === null || _a === void 0 ? void 0 : _a.url;
        if (!file)
            return console.log(strings_1.EN.Strings.no_file_found);
        try {
            const response = yield fetch(file);
            const text = yield response.text();
            let itemList = text.split("\n");
            //Pushes each set of good and bad items into the bagOfHolding array
            itemList.slice(1).forEach(items => {
                if (items) {
                    let item1 = (0, Types_1.itemParse)(items.split(','));
                    if (typeof item1 === 'undefined') {
                        return;
                    }
                    __1.bagOfHolding.push(item1);
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
