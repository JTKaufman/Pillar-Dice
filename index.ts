import DiscordJS, { Intents, Interaction } from 'discord.js'
import random from 'lodash.random'
import parse from 'csv-parse'
import dotenv from 'dotenv'
dotenv.config()

// const parser = parse({columns: true}, function (err, records) {
//     console.log(records)
// })

const client = new DiscordJS.Client({
    intents: [
        //What our bot intends to do
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('Pillar bot online!')

    //Establishes commands available in discord server
    const guildId = typeof process.env.GUILDID
    const guild = client.guilds.cache.get(guildId)
    let commands;

    if(guild) {
         commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    //Adds '/roll' as a command
    commands?.create({
        name: 'roll',
        description: 'Rolls a D20',
    })
})

//Checks the command used and executes a function based on what command was invoked
client.on('interactionCreate', interaction => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction
    console.log(commandName)
    if(commandName === 'roll') {
        interaction.reply({
            content: 'You rolled: ' + random(1, 20),
        })
    }
})

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const file = message.attachments.first()?.url
    if (!file) return console.log('No attached file found!')

    try {
        message.channel.send('Reading the file! Fetching data...')

        const response = await fetch(file)

        //Find a way to check response this gives an overload error

        const text = await response.text();

        console.log(text)

        if (text) {
            message.channel.send(`\`\`\`${text}\`\`\``)
        }

      } catch (error) {
        console.log(error);
      }
})

client.login(process.env.TOKEN)