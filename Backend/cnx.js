const { Pool } = require('pg');

const db = new Pool ({
    user: 'postgres',
    password: 'G6xty:b;V;t(*sVp',
    host: '34.72.222.186',
    port: 5432,
    database: 'maquinas-apontamento',
})

module.exports = db;