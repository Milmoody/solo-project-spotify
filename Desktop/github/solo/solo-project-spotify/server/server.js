const express = require('express');
const app = express();
const path = require('path');
const db = require('./db/items')

//API ACTIONS HERE


//statically serve everything in the build folder
app.use('/build', express.static(path.join(__dirname, '../build')));
app.use(express.json())

//serve index.html on / route

app.put('/items', (req, res, next) => {
    const syncResult = db.sync(req.body);
    if (syncResult instanceof Error) {
        return next({ code: 400, error: syncResult });
      }
      res.json(syncResult);
})
app.get('/items', (req, res) => {
    res.json(db.find());
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(3000);