const express = require('express');
const router = express.Router();
const path = require('path')

router.get('/', (req,res) =>{
    res.send("Página Principal")
});

// Puxar Página de login //

router.get('/login', (req, res) => {
    const filePath = path.resolve(__dirname, '../src/login.html');
    res.sendFile(filePath)
});

router.get('/produtos', (req, res) => {
    const filePath = path.resolve(__dirname, '../src/produtos.html');
    res.sendFile(filePath)
});

module.exports=router