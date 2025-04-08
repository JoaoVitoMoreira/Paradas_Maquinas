const express = require('express');
const path = require('path');
const  authMiddleware  = require('../middleware/auth.js')
const {getUsuarios, addUsuarios,updateUsuario,deleteUsuario,loginUsuario,getUsuarioAutenticado} = require('../controllers/users-sequelize.js');
const { get } = require('https');

const router = express.Router();

// Rota de login

router.post('/login',loginUsuario);

router.get("/usuarios",authMiddleware,getUsuarios);

router.get("/usuario-autenticado", authMiddleware, getUsuarioAutenticado);

router.post("/usuarios", addUsuarios);

router.put("/usuarios/:id", updateUsuario);
 
router.delete("/usuarios/:id", deleteUsuario);

module.exports = router;    