const express = require('express');
const path = require('path');
//Usa o metodo normal de querys
//const { getUsuarios, addUsuarios,updateUsuario,deleteUsuario } = require('../controllers/user.js');
//Usa a ORM Sequelize
const {getUsuarios, addUsuarios,updateUsuario,deleteUsuario} = require('../controllers/users-sequelize.js')

const router = express.Router();

router.get('/', (req,res) =>{
    res.send("Página Principal")
});

router.get("/usuarios", getUsuarios);

router.post("/usuarios", addUsuarios);

router.put("/usuarios/:id", updateUsuario);
 
router.delete("/usuarios/:id", deleteUsuario);

module.exports = router;