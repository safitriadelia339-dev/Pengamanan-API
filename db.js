const { text } = require('express');
const { pool } = require('pg');
require('dotenv').config();

const pool = new pool ({
    conenectionString: process.env.DATABASE_URL,
    
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};