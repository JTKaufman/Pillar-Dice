import { GuildApplicationCommandManager, ApplicationCommandManager, ApplicationCommand } from 'discord.js'
import {EN} from '../utils/strings'
import random from 'lodash.random'
import { getAnItemReplyBuilder } from '../utils/Utils'
import { bagOfHolding } from '..'

export function createGetAnItemCommand(commands: GuildApplicationCommandManager | ApplicationCommandManager<ApplicationCommand<{ guild: any }>, { guild: any }, null> | undefined) {
    //Adds '/getanitem' as a command
    commands?.create({
        name: EN.Strings.command_name_getanitem,
        description: EN.Strings.command_description_getanitem,
    })
}

export function getAnItemReply(interaction: { reply: (arg0: { content: string }) => void }) {
    //Messages channel with the item pulled unless all items have been pulled
    let itemPulled = getAnItem()

    if (bagOfHolding.length === 0) {
        interaction.reply({
            content: EN.Strings.command_reply_getanitem_empty,
        })
    } else if (itemPulled != null) {
        interaction.reply({
            content: getAnItemReplyBuilder(itemPulled),

        })
    } else {
        interaction.reply({
            content: EN.Strings.command_reply_getanitem_empty,
        })
    }
}

function getAnItem() {
    let itemRoll = random(1,20)
    
    if (bagOfHolding.some(item => item.pulled === false)) {
        //Gets a random row from the bagOfHolding array to choose a good or bad item from that has not been pulled
        let itemIndex = random(0, bagOfHolding.length - 1)
        while (bagOfHolding[itemIndex].pulled === true) {
            itemIndex = random(0, bagOfHolding.length - 1)
        } 

        //Marks the item row as pulled so it is not pulled again
        bagOfHolding[itemIndex].pulled = true
        
        //Returns the good Item on a roll > 10 and Bad item on rolls <= 10
        if (itemRoll > 10) {
            return [bagOfHolding[itemIndex].goodItemName, bagOfHolding[itemIndex].goodItemDescription]
        } else {
            return [bagOfHolding[itemIndex].badItemName, bagOfHolding[itemIndex].badItemDescription]
        }

    } else {
        return
    }
}