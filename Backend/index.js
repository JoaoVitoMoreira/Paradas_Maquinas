const cors = require('cors');
const express = require('express');
const path = require('path');
const router = require('./routes/routes.js');

const app = express();
app.use(express.json());

app.use(cors())

app.use('/',router);

app.listen(4000, ()=>{
    console.log('Servidor Ligado')
});