import DiscordJS, { Intents, Interaction } from 'discord.js'
import random from 'lodash.random'
import dotenv from 'dotenv'
import { item, itemParse } from './Types'
import { EN } from './utils/strings'
import { getAnItemReply } from './utils/Utils'
import {createRollCommand, getRollReply} from './commands/roll'
import { createGetAnItemCommand } from './commands/getanitem'
import { createNewGameCommand, getNewGameReply } from './commands/newgame'
import { createEmptyBagOfHoldingCommand, getEmptyBagOfHoldingReply } from './commands/emptybagofholding'
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
})



//Checks the command used and executes a function based on what command was invoked
client.on('interactionCreate', interaction => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction
    console.log(commandName)

    switch(commandName) {
        case EN.Strings.Command_name_roll: getRollReply(interaction);
        case EN.Strings.command_name_newgame: getNewGameReply(interaction);
        case EN.Strings.command_name_getanitem: getAnItemReply(interaction);
        case EN.Strings.command_name_emptybagofholding: getEmptyBagOfHoldingReply(interaction);
    }
})

//
client.on('messageCreate', async (message) => {
    //Returns if the message was sent by a bot
    if (message.author.bot) return;

    //Checks message for attachment and returns if there is no attachments
    const file = message.attachments.first()?.url
    if (!file) return console.log(EN.Strings.no_file_found)

    try {
        message.channel.send(EN.Strings.reading_file)
        const response = await fetch(file)

        //Checks to make sure there is a response and that it includes the correct file to only update the bagOfHolding
        if(!response || !response.url.includes('bag_of_holding.csv')) {
            //Returns if this is not a bagOfHolding update
            console.log(EN.Strings.wrong_attachment)
            return;
        } else {
            //Deletes the previous message to hide the new bagOfHolding contents and then updates the items in the bagOfHolding
            message.delete()
            message.channel.send(EN.Strings.updating_bag_of_holding)

            //Breaks the file contents of the bag_of_holding.csv into an array
            const text = await response.text();
            let itemList = text.split("\n")
            
            //Pushes each set of good and bad items into the bagOfHolding array
            itemList.slice(1).forEach(items => {
                if (items) {
                    let item1 = itemParse(items.split(','))
                    if (typeof item1 === 'undefined') {
                        return
                    }
                    bagOfHolding.push(item1)
                }
            });

            bagOfHolding.forEach((i: any) => {
                console.log(i)
            })

            message.channel.send(EN.Strings.updated_bag_of_holding)

        }
      } catch (error) {
        console.log(error);
      }
})

client.login(process.env.TOKEN)