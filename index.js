const express = require('express');
const app = express();
const path = require('path')

const routes = require('./routes/routes.js')

app.use('/',routes);

app.use(express.static(path.join(__dirname,'src')));

app.listen(4000, ()=>{
    console.log('Servidor Ligado')
});