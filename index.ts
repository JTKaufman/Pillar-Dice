import DiscordJS, { Intents, Interaction } from 'discord.js'
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

    //Adds '/getanitem' as a command
    commands?.create({
        name: 'getanitem',
        description: 'Pulls an item from the bag of holding',
    })

    //Adds '/emptybagofholding' as a command
    commands?.create({
        name: 'emptybagofholding',
        description: 'Removes all items from the bag of holding',
    })
})

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

//Checks the command used and executes a function based on what command was invoked
client.on('interactionCreate', interaction => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction
    console.log(commandName)

    //Messages channel with players roll between 1-20
    if(commandName === 'roll') {
        interaction.reply({
            content: 'You rolled: ' + random(1, 20),
        })
    }

    //Messages channel with the item pulled unless all items have been pulled
    if(commandName === 'getanitem') {

        if (bagOfHolding.length === 0) {
            interaction.reply({
                content: 'The bag of holding is empty. There are no items to pull.',

            })
        }

        let itemPulled = getAnItem()
        if (itemPulled != null) {
            interaction.reply({
                content: 'You got ' + itemPulled[0] + '! This item has the following properties: ' + itemPulled[1],

            })
        } else {
            interaction.reply({
                content: 'There are no more items to pull from the bag of holding.',
            })
        }
    }

    //Empties the bag of holding array and notifies discord channel
    if(commandName === 'emptybagofholding') {
        
        bagOfHolding.length = 0

        interaction.reply({
            content: 'The bag of holding has been emptied.',
        })
    }
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
            })

            message.channel.send('The bag of holding has been updated with the new items.')

        }
      } catch (error) {
        console.log(error);
      }
})

client.login(process.env.TOKEN)