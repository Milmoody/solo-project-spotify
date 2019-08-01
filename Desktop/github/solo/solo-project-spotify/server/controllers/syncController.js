const fs = require('fs');
const path = require('path');

const syncController = {};


syncController.getItems = (req, res, next) => {
    const results = fs.readFileSync(path.resolve(__dirname, '../db/items.dev.json'))
    const jsonResults = JSON.parse(results);
    if(typeof results !== 'object'){
        return next({
            log: `syncController Error`,
            message: {err: 'syncController error'},
        })
    }
    res.locals.items = jsonResults;
    return next();
}

syncController.syncItems = (req, res, next) => {
    console.log(res.locals.items);
  if (typeof res.locals.items !== 'object') {
    return next({
      log: 'fileController.addFavs: ERROR: Invalid or unfound required data on res.locals object - Expected res.locals.favs to be an object.',
      message: { err: 'fileController.addFavs: ERROR: Check server logs for details' },
    })
  }
  fs.writeFileSync(path.join(__dirname, '../db/items.dev.json'), JSON.stringify(res.locals.items), (err) => {
      if(err) {
          return next({
            log: `fileController.addFav: ERROR: /* the error from the file system / other calls */`,
            message: { err: 'fileController.addFav: ERROR: Check server logs for details' },
          })
      }
  })
  return next();
  };

syncController.loadItems = (req, res, next) => {
    const results = fs.readFileSync(path.resolve(__dirname, '../db/items.dev.json'))
    const jsonResults = JSON.parse(results);
    if(typeof results !== 'object'){
        return next({
            log: `syncController Error`,
            message: {err: 'syncController error'},
        })
    }
}  

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

syncController.sync = (items) => {
    if(!Array.isArray(items)){
        return new Error(`Item list must be an array. Received ${typeof items}`)
    }
    if(items.some(m => (typeof m.text !== 'string'))){
        return new Error(`Items must be strings`)
    }
    syncController.write(items);
    syncController.reset();
    return itemList;
}

syncController.find = () => {
    syncController.reset();
    return itemList;
}

syncController.write = (data) => {
    fs.writeFileSync(writeLocation, JSON.stringify(data, null, 2))
}

syncController.reset = () => {
    itemList = JSON.parse(fs.readFileSync(writeLocation));
}

module.exports = syncController;