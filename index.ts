import DiscordJS, { Intents } from 'discord.js'
import random from 'lodash.random'
import parse from 'csv-parse'
import dotenv from 'dotenv'
import { item, itemParse } from './Types'
dotenv.config()

let bagOfHolding:item[] = [];

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

//
client.on('messageCreate', async (message) => {
    //Returns if the message was sent by a bot
    if (message.author.bot) return;

    //Checks message for attachment and returns if there is no attachments
    const file = message.attachments.first()?.url
    if (!file) return console.log('No attached file found!')

    try {
        message.channel.send('Reading the file! Fetching data...')
        const response = await fetch(file)

        //Checks to make sure there is a response and that it includes the correct file to only update the bagOfHolding
        if(!response || !response.url.includes('bag_of_holding.csv')) {
            //Returns if this is not a bagOfHolding update
            console.log('No response or the wrong attachment was found.')
            return;
        } else {
            //Deletes the previous message to hide the new bagOfHolding contents and then updates the items in the bagOfHolding
            message.delete()
            message.channel.send('updating items in the bag of holding...')

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
                message.channel.send(`\`\`\`${i.goodItemName}\`\`\``)
            })

        }
      } catch (error) {
        console.log(error);
      }
})

client.login(process.env.TOKEN)