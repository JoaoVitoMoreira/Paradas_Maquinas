const db=require('../cnx');
const readline = require('readline');

async function listar(){
    await db.connect()
    resultado=await db.query('select * from produtos')
    console.log(resultado.rows)
    await db.end()
}

listar()

//const rl = readline.createInterface({
//  input: process.stdin,
//  output: process.stdout
//});

//rl.question('Digite o nome da tabela: ', (resposta) => {
//  listar(resposta);
//  rl.close();
//});
