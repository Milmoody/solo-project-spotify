const fs = require('fs');

let writeLocation;
let itemList;
if(process.env.NODE_ENV ==='production'){
    writeLocation = `$__dirname}/items.prod.json`;
    itemList = JSON.parse(fs.readFileSync(writeLocation));
} else {
    writeLocation = `${__dirname}/items.dev.json`;
    itemList = JSON.parse(fs.readFileSync(writeLocation));
}

const db = {};

/*
* #sync overwrites the current database with items from client
*
* @param {Array} items - the new items list
* @return {Array} - the list of items
* */

db.sync = (items) => {
    if(!Array.isArray(items)){
        return new Error(`Item list must be an array. Received ${typeof items}`)
    }
    if(items.some(m => (typeof m.text !== 'string'))){
        return new Error(`Items must be strings`)
    }
    db.write(items);
    db.reset();
    return itemList;
}

db.find = () => {
    db.reset();
    return itemList;
}

db.write = (data) => {
    fs.writeFileSync(writeLocation, JSON.stringify(data, null, 2))
}

db.reset = () => {
    itemList = JSON.parse(fs.readFileSync(writeLocation));
}
module.exports = db;