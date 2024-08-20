const {Pool} = require ('pg')

const pool = new Pool ({
    user: 'postgres',
    password: 'c3xgqVOq7l3e',
    host: 'paradas-maquinas.cvee4a6wqmi3.us-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'projeto_paradas',
    ssl:  {rejectUnauthorized: false }
})

module.exports=pool