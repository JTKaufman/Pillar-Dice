//String building helper function for getAnItem reply content
export function getAnItemReplyBuilder(itemPulled: string[]) {
    let reply = 'You got ' + itemPulled[0] + '! This item has the following properties: ' + itemPulled[1]
    return reply
}