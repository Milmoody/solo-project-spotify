const pg = require('pg');

const db = {};
const uri = 'postgres://ltdeucsu:slI37-4G2giGa9SkEI0fIzXhk6l57GBD@raja.db.elephantsql.com:5432/ltdeucsu';

pg.Connection(uri, (err, db_) => {
    if(err) throw new Error(err);
    db.conn = db_;
})

module.exports = db