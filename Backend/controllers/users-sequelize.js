const db = require('../cnx.js');  
const { Usuario } = require('../models')
const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');  

const getUsuarios = async (_, res) => {
    try {
        const usuarios = await Usuario.findAll();

        return res.status(200).json(usuarios);
    } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        return res.status(500).json({ error: err.message, details: err });
    }
};

const addUsuarios = async (req, res) => {
    try {
      const novoUsuario = await Usuario.create({
        nome_usua: req.body.nome,
        senha_usua: req.body.senha,
        func_usua: req.body.cargo,
      });
  
      return res.status(200).json(novoUsuario);
    } catch (error) {
      console.error("Erro ao inserir usuário:", error);
      return res.status(500).json({ message: "Erro ao criar usuário", details: error.message });
    }
};

const updateUsuario = async (req, res) => {
    const { nome_usua, senha_usua, func_usua } = req.body;
    const id = req.params.id;
  
    try {
      const usuario = await Usuario.findByPk(id);
  
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }
  
      await usuario.update({
        nome_usua,
        senha_usua,
        func_usua
      });
  
      return res.status(200).json({ message: "Usuário atualizado com sucesso!", data: usuario });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({ message: "Erro ao atualizar o usuário", error: error.message });
    }
};

const deleteUsuario = async (req, res) => {
    const id = req.params.id;
  
    try {
      const usuario = await Usuario.findByPk(id);
  
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }
  
      await usuario.destroy();
  
      return res.status(200).json({ message: "Usuário deletado com sucesso!", data: usuario });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return res.status(500).json({ message: "Erro ao deletar o usuário", error: error.message });
    }
};

// Funçao de Login de usuário

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  // Verificando os campos preenchidos
  if (!email || !senha) {
    return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
  }

  try {
    // Usando Sequelize para encontrar o usuário pelo e-mail
    const user = await Usuario.findOne({ where: { email_usua: email } });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    // Comparando a senha criptografada no banco de dados
    const isPasswordValid = await bcrypt.compare(senha, user.senha_usua);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "E-mail ou senha incorretos!" });
    }

    // Gerando token JWT
    const token = jwt.sign(
      { userId: user.id_usua, email: user.email_usua },
      process.env.JWT_SECRET,
      { expiresIn: '10min' }
    );

    // Enviando o token no corpo de resposta
    return res.status(200).json({
      message: "Login bem-sucedido",
      token: token // Enviando o token gerado
    });
  } catch (err) {
    console.error("Erro ao realizar o login ", err);
    return res.status(500).json({ message: "Erro interno ao realizar o login", details: err.message });
  }
};


module.exports = {
    getUsuarios,
    addUsuarios,
    updateUsuario,
    deleteUsuario,
    loginUsuario
};
