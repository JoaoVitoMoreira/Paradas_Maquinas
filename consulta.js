const db=require('./cnx')

async function listar(){
    await db.connect()
        resultado=await db.query('select * from moldes')
        console.log(resultado.rows)
        await db.end()
   
}

listar()