const express = require('express');
const path = require('path');
const  authMiddleware  = require('../middleware/auth.js')
const {getUsuarios, addUsuarios,updateUsuario,deleteUsuario,loginUsuario,getUsuarioAutenticado} = require('../controllers/users-sequelize.js');
const { get } = require('https');
const { refreshUsuario, logoutUsuario } = require('../controllers/user.js');

const router = express.Router();

// Rota de login

router.post('/login',loginUsuario);

router.post('/refresh', refreshUsuario);

router.post('/logout', logoutUsuario);

router.get("/usuarios",authMiddleware,getUsuarios);

// Rota protegida
//router.get('/usuarios', auth, autorizar('admin'), getUsuarios);
//router.get('/sessoes', auth, listarSessoesUsuario);
//router.delete('/sessoes/:id', auth, revogarSessaoUsuario);

router.get("/usuario-autenticado", authMiddleware, getUsuarioAutenticado);

router.post("/usuarios", addUsuarios);

router.put("/usuarios/:id", updateUsuario);
 
router.delete("/usuarios/:id", deleteUsuario);

module.exports = router;    