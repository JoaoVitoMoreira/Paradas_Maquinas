const express = require('express');
const path = require('path');
const { getUsuarios, addUsuarios,updateUsuario,deleteUsuario } = require('../controllers/user.js');

const router = express.Router();

router.get('/', (req,res) =>{
    res.send("Página Principal")
});

// Puxar Página de login //

router.get('/login', (req, res) => {
    const filePath = path.resolve(__dirname, '../src/login.html');
    res.sendFile(filePath)
});

router.get("/usuarios", getUsuarios);

router.post("/usuarios", addUsuarios);

router.put("/usuarios/:id", updateUsuario);

router.delete("/usuarios/:id", deleteUsuario);

module.exports = router;