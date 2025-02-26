const express = require('express');
const path = require('path');

const {getUsuarios, addUsuarios,updateUsuario,deleteUsuario,loginUsuario} = require('../controllers/users-sequelize.js')

const router = express.Router();

// Rota de login

router.post('/login',loginUsuario);

router.get("/usuarios", getUsuarios);

router.post("/usuarios", addUsuarios);

router.put("/usuarios/:id", updateUsuario);
 
router.delete("/usuarios/:id", deleteUsuario);

module.exports = router;