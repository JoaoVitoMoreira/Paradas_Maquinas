const express = require('express');
const router = express.Router();
const path = require('path')

router.get('/', (req,res) =>{
    res.send("Hello World from server 4000")
});

// Puxar Página de login //

router.get('/login', (req, res) => {
    
    const filePath = path.resolve(__dirname, '../src/login.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Erro ao enviar o arquivo:', err);
            res.status(500).send('Erro ao carregar o arquivo.');
        }
    });
});

module.exports=router