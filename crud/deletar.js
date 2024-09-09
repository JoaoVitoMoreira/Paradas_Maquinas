const db=require('../cnx');
const readline = require('readline');

async function deletar(id) {
    await db.connect()
    await db.query(`delete from produtos where id_prod = ${id}`)
    console.log("deletado com sucesso!")
    await db.end()
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite o ID que deseja deletar: ', (resposta) => {
  deletar(resposta);
  rl.close();
});