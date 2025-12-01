const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('movies.db');

db.all("PRAGMA table_info(users)", [], (err, rows) => {
    if (err) console.error(err);
    console.log(rows);
});