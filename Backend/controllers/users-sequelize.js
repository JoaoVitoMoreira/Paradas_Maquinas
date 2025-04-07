const { where } = require('sequelize');
const db = require('../cnx.js');  
const { Usuario } = require('../models')
const bcrypt = require('bcryptjs');  
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

    var salt = bcrypt.genSaltSync(12);

    try {
      const novoUsuario = await Usuario.create({
        nome_usua: req.body.nome,
        senha_usua: bcrypt.hashSync(req.body.senha),
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

const getUsuarioAutenticado = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "chave_secreta");

    return res.json({
      usuario: { nome_usua: decoded.nome } // 👈 nome_usua vem do token
    });
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};



const loginUsuario = async (req, res) => {
  const { nome, senha } = req.body;

  try {
    const user = await Usuario.findOne({ where: { nome_usua: nome } });

    if (!user || !bcrypt.compareSync(senha, user.senha_usua)) {
      return res.status(401).json({ message: "Nome ou senha incorretos!" });
    }

    const token = jwt.sign(
      { id: user.id_usua, nome: user.nome_usua },
      process.env.JWT_SECRET || "chave_secreta",
      { expiresIn: "1min" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: false,
      maxAge: 3600000
    });

    return res.json({ message: "Login bem-sucedido" });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

const logoutUsuario = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Strict",
    secure: false,
  });
  res.json({ message: "Logout realizado com sucesso" });
};


module.exports = {
    getUsuarios,
    addUsuarios,
    updateUsuario,
    deleteUsuario,
    loginUsuario,
    logoutUsuario,
    getUsuarioAutenticado
};

