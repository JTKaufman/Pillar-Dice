import { GuildApplicationCommandManager, ApplicationCommandManager, ApplicationCommand, Client, CommandInteraction, CacheType } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders';
import {EN} from '../utils/strings'
import { itemParse } from '../Types'
import { bagOfHolding } from '..'
import { RequestInfo, RequestInit } from "node-fetch";

const fetch = (url: RequestInfo, init?: RequestInit) =>  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

export function createUpdateBagOfHoldingCommand(commands: GuildApplicationCommandManager | ApplicationCommandManager<ApplicationCommand<{ guild: any }>, { guild: any }, null> | undefined) {
    
    var guildCommand = new SlashCommandBuilder()
    .setName(EN.Strings.command_name_updatebagofholding)
    .setDescription(EN.Strings.command_description_updatebagofholding)
    .addAttachmentOption(option => option.setName("items")
    .setDescription("The file containg the list of items to add to the bag of holding.")
    .setRequired(true))

    
    //Adds '/getanitem' as a command
    commands?.create(
        guildCommand.toJSON()
    )

}

export function getUpdateBagOfHoldingReply(interaction: CommandInteraction<CacheType>) {
    //updateBagOfHolding(interaction)
    updateBagOfHolding(interaction)
    interaction.reply({
        content: EN.Strings.updated_bag_of_holding,
    })
}

async function updateBagOfHolding(interaction: CommandInteraction<CacheType>) {
    const file = interaction.options.getAttachment('items')?.url
    if (!file) return console.log(EN.Strings.no_file_found)

    try {
        const response = await fetch(file)
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
    } catch (error) {
        console.log(error);
    }
}