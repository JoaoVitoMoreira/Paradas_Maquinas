const db = require('../cnx.js');  
const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');  

const getUsuarios = async (_, res) => {
    const q = "SELECT * FROM usuarios";

    try {
        const { rows } = await db.query(q);
        return res.status(200).json(rows);
    } catch (err) {
        return res.status(500).json({ error: err.message, details: err });
    }
};

const addUsuarios = (req, res) => {
    const q = 'INSERT INTO usuarios (nome_usua, senha_usua, func_usua) VALUES ($1, $2, $3) RETURNING *';

    const values = [
        req.body.nome,
        req.body.senha,
        req.body.cargo,
    ];

    db.query(q, values, (err) => {
        if (err) {
            console.error("Erro ao inserir usuário:", err);
            return res.status(500).json({ message: "Erro ao criar usuário" });
        }

        return res.status(200).json("Usuário criado com sucesso!");
    });
};


const updateUsuario = async (req, res) => {
    const q = "UPDATE usuarios SET nome_usua = $1, senha_usua = $2, func_usua = $3 WHERE id_usua = $4";
    const values = [
        req.body.nome_usua,
        req.body.senha_usua,
        req.body.func_usua,
        req.params.id
    ];

    try {
        // Verifica se o usuário existe antes de atualizar
        const checkUser = await db.query("SELECT * FROM usuarios WHERE id_usua = $1", [req.params.id]);
        if (checkUser.rows.length === 0) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }

        // Atualiza o usuário
        const { rows } = await db.query(q, values);
        return res.status(200).json({ message: "Usuário atualizado com sucesso!", data: rows[0] });
    } catch (err) {
        console.error("Erro ao atualizar usuário:", err);
        return res.status(500).json({ message: "Erro ao atualizar o usuário", error: err });
    }
};


const deleteUsuario = async (req, res) => {
    const q = "DELETE FROM usuarios WHERE id_usua = $1 RETURNING *";

    try {
        const { rows } = await db.query(q, [req.params.id]);
        return res.status(200).json({ message: "Usuário deletado com sucesso!", data: rows[0] });
    } catch (err) {
        return res.status(500).json(err);
    }
};

// Funçao de Login de usuário

const loginUsuario = async (req,res) =>{
    const {email, senha} = req.body; 

    // Verificando os campos preenchidos
    if(!email || !senha) {
        return res.status(400).json({message: "E-mail e senha são obrigatórios"});
    }

    try{
        // Verificação de existência de usuario no banco de dados
        const result = await db.query("SELECT * FROM usuarios WHERE email_usua = $1",[email]) 

        if(result.rows.length === 0){
            return res.status(401).json({message: "Usuário não encontrando"});
        }

        const user = result.rows[0];

        // comparando a senha criptografada no banco de dados
        const isPasswordValid = await bcrypt.compare(senha,user.senha_usua);

        if(!isPasswordValid){
            return res.status(401).json({message:"E-mail ou senha incorretos!"});
        }

        // Gerando token JWT
        const token = jwt.sign(
            {userId:user.id_usua,email:user.email_usua},
            process.env.JWT_SECRET,
            {expiresIn:'10min'}
        );

        // Enviando o token no corpo de resposta 
        return res.status(200).json({
            message:"Login bem-sucedido",
            token:token // Enviando o token gerado
        });
    } catch (err){
        console.error("Erro ao realizar o login ",err);
        return res.status(500).json({message:"Erro interno ao realizar o login",details:err.message})
    }
};

module.exports = {
    getUsuarios,
    addUsuarios,
    updateUsuario,
    deleteUsuario,
    loginUsuario,
};