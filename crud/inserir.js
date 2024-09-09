const db=require('../cnx');
const readline = require('readline');

async function inserir(nome,valor) {
    await db.connect()
    await db.query(`insert into produtos (${nome}) values ('${valor}')`)
    console.log("inserido com sucesso!")
    await db.end()
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite o nome da coluna: ', (resposta1) => {
    rl.question('Digite o produto: ', (resposta2) => {
      inserir(resposta1, resposta2);
      rl.close();
    });
  });