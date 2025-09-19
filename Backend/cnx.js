const { Pool } = require('pg');

const db = new Pool ({
    user: 'postgres',
    password: '5DY5Nweb9',
    host: '135.224.15.6',
    port: 5432,
    database: 'teste',
})

module.exports = db;