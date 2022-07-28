//Creates the item type to be put into a list of items for the Get an item function
export type item = {
    goodItemName: string;
    goodItemDescription: string;
    badItemName: string;
    badItemDescription: string;
    pulled: boolean;
}

export function itemParse(itemArray: string[]) {
    if(itemArray.length != 4) {
        console.log('Not enough parameters.')
        return
    }
    
    let item: item = {
        goodItemName: itemArray[0],
        goodItemDescription: itemArray[1],
        badItemName: itemArray[2],
        badItemDescription: itemArray[3],
        pulled: false
    }

    return item
}