import { GuildApplicationCommandManager, ApplicationCommandManager, ApplicationCommand, CacheType, CommandInteraction } from 'discord.js'
import {EN} from '../utils/strings'
import random from 'lodash.random'

export function createRollCommand(commands: GuildApplicationCommandManager | ApplicationCommandManager<ApplicationCommand<{ guild: any }>, { guild: any }, null> | undefined) {
   //Adds '/roll' as a command
    commands?.create({
        name: EN.Strings.Command_name_roll,
        description: EN.Strings.command_description_roll,
    })
}

export function getRollReply(interaction: CommandInteraction<CacheType>) {
    //Messages channel with players roll between 1-20
    interaction.reply({
        content: EN.Strings.command_reply_roll + random(1, 20),
    })
}

