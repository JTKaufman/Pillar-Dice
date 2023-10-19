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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bagOfHolding = void 0;
const discord_js_1 = __importStar(require("discord.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const strings_1 = require("./utils/strings");
const roll_1 = require("./commands/roll");
const getanitem_1 = require("./commands/getanitem");
const newgame_1 = require("./commands/newgame");
const emptybagofholding_1 = require("./commands/emptybagofholding");
const updatebagofholding_1 = require("./commands/updatebagofholding");
dotenv_1.default.config();
exports.bagOfHolding = [];
const client = new discord_js_1.default.Client({
    intents: [
        //What our bot intends to do
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES
    ]
});
client.on('ready', () => {
    var _a;
    console.log(strings_1.EN.Strings.bot_online);
    //Establishes commands available in discord server
    const guildId = typeof process.env.GUILDID;
    const guild = client.guilds.cache.get(guildId);
    let commands;
    if (guild) {
        commands = guild.commands;
    }
    else {
        commands = (_a = client.application) === null || _a === void 0 ? void 0 : _a.commands;
    }
    (0, roll_1.createRollCommand)(commands);
    (0, getanitem_1.createGetAnItemCommand)(commands);
    (0, newgame_1.createNewGameCommand)(commands);
    (0, emptybagofholding_1.createEmptyBagOfHoldingCommand)(commands);
    (0, updatebagofholding_1.createUpdateBagOfHoldingCommand)(commands);
});
//Checks the command used and executes a function based on what command was invoked
client.on('interactionCreate', interaction => {
    if (!interaction.isCommand())
        return;
    const { commandName } = interaction;
    console.log(commandName);
    switch (commandName) {
        case strings_1.EN.Strings.Command_name_roll: {
            (0, roll_1.getRollReply)(interaction);
            break;
        }
        case strings_1.EN.Strings.command_name_newgame: {
            (0, newgame_1.getNewGameReply)(interaction);
            break;
        }
        case strings_1.EN.Strings.command_name_getanitem: {
            (0, getanitem_1.getAnItemReply)(interaction);
            break;
        }
        case strings_1.EN.Strings.command_name_emptybagofholding: {
            (0, emptybagofholding_1.getEmptyBagOfHoldingReply)(interaction);
            break;
        }
        case strings_1.EN.Strings.command_name_updatebagofholding: {
            (0, updatebagofholding_1.getUpdateBagOfHoldingReply)(interaction);
            break;
        }
    }
});
client.login(process.env.TOKEN);
