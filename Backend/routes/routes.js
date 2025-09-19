const express = require('express');
const authMiddleware = require('../middleware/auth.js');

const {
    getUsuarios,
    addUsuarios,
    updateUsuario,
    deleteUsuario,
    loginUsuario,
    logoutUsuario,
    refreshUsuario, 
    getUsuarioAutenticado
} = require('../controllers/usuarioController.js'); 

const { createApontamento } = require('../controllers/apontamentoController.js');

const router = express.Router();

router.post('/login', loginUsuario);
router.post('/logout', logoutUsuario);
router.post('/refresh', refreshUsuario); 

router.get("/usuarios", authMiddleware, getUsuarios);
router.post("/usuarios", addUsuarios);
router.put("/usuarios/:id", authMiddleware, updateUsuario);
router.delete("/usuarios/:id", authMiddleware, deleteUsuario);
router.get("/usuario-autenticado", authMiddleware, getUsuarioAutenticado);
router.post("/apontamentos", authMiddleware, createApontamento);

module.exports = router;