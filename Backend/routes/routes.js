const express = require('express');
const router = express.Router();
const path = require('path')
const getProdutos = require('../controllers/produtos');

router.get('/', (req,res) =>{
    res.send("Página Principal")
});

// Puxar Página de login //

router.get('/login', (req, res) => {
    const filePath = path.resolve(__dirname, '../src/login.html');
    res.sendFile(filePath)
});

router.get("/produtos", getProdutos)

module.exports=router