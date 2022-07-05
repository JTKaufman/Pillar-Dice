import DiscordJS, { Intents } from 'discord.js'
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
})

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;


    //Roll Command; Rolls a D20
    if (message.content === '/roll') {
        console.log(message.content)
        message.channel.send({
            content: 'You rolled: ' + random(1, 20),
        })
        return;
    }

    if (message.content === 'Hello world!') {
        message.channel.send({
            content: 'Hello world!',
        })
        return;
    }

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