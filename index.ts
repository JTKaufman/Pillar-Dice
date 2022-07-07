import DiscordJS, { Intents } from 'discord.js'
import random from 'lodash.random'
import parse from 'csv-parse'
import dotenv from 'dotenv'
import { item, itemParse } from './Types'
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

    const file = message.attachments.first()?.url
    if (!file) return console.log('No attached file found!')

    try {
        message.channel.send('Reading the file! Fetching data...')
        const response = await fetch(file)

        //Checks to make sure there is a response and that it includes the correct file
        if(!response || !response.url.includes('bag_of_holding.csv')) {
            console.log('No response or the wrong attachment was found.')
            return;
        } else {
            message.channel.send('updating items in the bag of holding...')
            const text = await response.text();

            console.log(text)

            let itemList = text.split("\n")
            

            itemList.slice(1).forEach(items => {
                if (items) {
                    let item1 = itemParse(items.split(','))
                    message.channel.send(`\`\`\`${item1}\`\`\``)
                    console.log(item1)
                }
            });

        }
      } catch (error) {
        console.log(error);
      }
})

client.login(process.env.TOKEN)