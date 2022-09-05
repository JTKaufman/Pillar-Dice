import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import { item } from './Types'
import { EN } from './utils/strings'
import {createRollCommand, getRollReply} from './commands/roll'
import { createGetAnItemCommand, getAnItemReply } from './commands/getanitem'
import { createNewGameCommand, getNewGameReply } from './commands/newgame'
import { createEmptyBagOfHoldingCommand, getEmptyBagOfHoldingReply } from './commands/emptybagofholding'
import { createUpdateBagOfHoldingCommand, getUpdateBagOfHoldingReply } from './commands/updatebagofholding'
dotenv.config()

export let bagOfHolding:item[] = [];


const client = new DiscordJS.Client({
    intents: [
        //What our bot intends to do
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log(EN.Strings.bot_online)

    //Establishes commands available in discord server
    const guildId = typeof process.env.GUILDID
    const guild = client.guilds.cache.get(guildId)
    let commands;

    if(guild) {
         commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    createRollCommand(commands)
    createGetAnItemCommand(commands)
    createNewGameCommand(commands)
    createEmptyBagOfHoldingCommand(commands)
    createUpdateBagOfHoldingCommand(commands)
})



//Checks the command used and executes a function based on what command was invoked
client.on('interactionCreate', interaction => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction
    console.log(commandName)

    switch(commandName) {
        case EN.Strings.Command_name_roll: {
            getRollReply(interaction);
            break;
        }
        case EN.Strings.command_name_newgame: {
            getNewGameReply(interaction);
            break;
        }
        case EN.Strings.command_name_getanitem: {
            getAnItemReply(interaction);
            break;
        }
        case EN.Strings.command_name_emptybagofholding: {
            getEmptyBagOfHoldingReply(interaction);
            break;
        }
        case EN.Strings.command_name_updatebagofholding: {
            getUpdateBagOfHoldingReply(interaction);
            break;
        }
    }
})

client.login(process.env.TOKEN)