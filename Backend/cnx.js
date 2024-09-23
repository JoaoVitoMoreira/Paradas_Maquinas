import pkg from "pg";
const {Pool} = pkg

export const db = new Pool ({
    user: 'postgres',
    password: 'qIBg*T:nd"cjNb-8',
    host: '34.45.198.90',
    port: 5432,
    database: 'paradas-maquinas',
})