const express = require('express');
const path = require('path');
const { authMiddlewar } = ('../middleware/auth.js');
const {getUsuarios, addUsuarios,updateUsuario,deleteUsuario,loginUsuario,getUsuarioAutenticado} = require('../controllers/users-sequelize.js');

const router = express.Router();

// Rota de login

router.post('/login',loginUsuario); 

router.get("/usuarios",getUsuarioAutenticado);

router.post("/usuarios", addUsuarios);

router.put("/usuarios/:id", updateUsuario);
 
router.delete("/usuarios/:id", deleteUsuario);

module.exports = router;    