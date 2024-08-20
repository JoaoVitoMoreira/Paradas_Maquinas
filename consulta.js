const db=require('./cnx')

async function listar(){
    await db.connect()
        resultado=await db.query('select * from maquinas')
        console.log(resultado.rows)
        await db.end()
   
}

listar()