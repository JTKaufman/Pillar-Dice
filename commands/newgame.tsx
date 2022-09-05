import { GuildApplicationCommandManager, ApplicationCommandManager, ApplicationCommand, CacheType, CommandInteraction } from 'discord.js'
import {EN} from '../utils/strings'
import { bagOfHolding } from '..'

export function createNewGameCommand(commands: GuildApplicationCommandManager | ApplicationCommandManager<ApplicationCommand<{ guild: any }>, { guild: any }, null> | undefined) {
    //Adds '/newgame' as a command
    commands?.create({
        name: EN.Strings.command_name_newgame,
        description: EN.Strings.command_description_newgame,
    })
}

export function getNewGameReply(interaction: CommandInteraction<CacheType>) {
    //Resets the pulled property of each item in the bag of holding array
    //Then messages channel to notify the players the bag of holding is ready for a new game
    if (bagOfHolding.length === 0) {
        interaction.reply({
            content: EN.Strings.command_reply_getanitem_empty,
        })
    } else {
        resetBagOfHolding()

        interaction.reply({
            content: EN.Strings.command_reply_newgame,
        })
    }
}

function resetBagOfHolding() {
    bagOfHolding.forEach((item: any) => {
        item.pulled = false
    })
}
