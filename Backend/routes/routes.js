import express from 'express';
import path from 'path';
import { getUsuarios,addUsuarios,updateUsuario,deleteUsuario } from '../controllers/user.js';

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

export default router;