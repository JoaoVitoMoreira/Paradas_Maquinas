const express = require('express')
const app = express()
const router =require('./routes/routes.js')

app.use(router)

app.listen(4000,() =>{
    console.log("Server ligado!!");
})