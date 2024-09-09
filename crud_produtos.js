const db=require('./cnx')

async function listar(tabela){
    await db.connect()
    resultado=await db.query(`select * from ${tabela}`)
    console.log(resultado.rows)
    await db.end()
}

async function inserir() {
    await db.connect()
    await db.query("insert into produtos (nome_prod) values ('teste2')")
    console.log("inserido com sucesso!")
    await db.end()
}

async function deletar(id) {
    await db.connect()
    await db.query(`delete from produtos where id_prod in (${id})`)
    console.log("deletado com sucesso!")
    await db.end()
}

async function atualizar() {
    await db.connect()
    await db.query("update produtos set nome_prod = 'Coluna 27x27 Cruz' where id_prod = 3")
    console.log("alterado com sucesso!")
    await db.end()
}


//inserir()
//atualizar()
//deletar()
//listar()