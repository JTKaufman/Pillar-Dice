import { GuildApplicationCommandManager, ApplicationCommandManager, ApplicationCommand } from 'discord.js'
import {EN} from '../utils/strings'
import { bagOfHolding } from '..'

export function createEmptyBagOfHoldingCommand(commands: GuildApplicationCommandManager | ApplicationCommandManager<ApplicationCommand<{ guild: any }>, { guild: any }, null> | undefined) {
    //Adds '/emptybagofholding' as a command
    commands?.create({
        name: EN.Strings.command_name_emptybagofholding,
        description: EN.Strings.command_description_emptybagofholding,
    })
}

export function getEmptyBagOfHoldingReply(interaction: { reply: (arg0: { content: string }) => void }) {
    //Empties the bag of holding array and notifies discord channel
    emptyBagOfHolding()

    interaction.reply({
        content: EN.Strings.command_reply_emptybagofholding,
    })
}

function emptyBagOfHolding() {
    bagOfHolding.length = 0
}
