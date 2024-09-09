const db=require('../cnx');
const readline = require('readline');

async function atualizar(alteracao,local) {
    await db.connect()
    await db.query(`update produtos set nome_prod = '${alteracao}' where id_prod = ${local}`)
    console.log("alterado com sucesso!")
    await db.end()
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite a alteração: ', (resposta1) => {
    rl.question('Digite o ID a ser alterado: ', (resposta2) => {
      atualizar(resposta1, resposta2);
      rl.close();
    });
  });