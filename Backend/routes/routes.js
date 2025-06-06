// Arquivo: routes/routes.js
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

const router = express.Router();

// --- Rotas de Autenticação ---
router.post('/login', loginUsuario);
router.post('/logout', logoutUsuario);
router.post('/refresh', refreshUsuario); 

// --- Rotas de Usuário (Protegidas) ---
router.get("/usuarios", authMiddleware, getUsuarios);
router.post("/usuarios",authMiddleware, addUsuarios);
router.put("/usuarios/:id", authMiddleware, updateUsuario);
router.delete("/usuarios/:id", authMiddleware, deleteUsuario);
router.get("/usuario-autenticado", authMiddleware, getUsuarioAutenticado);

module.exports = router;