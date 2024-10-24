const { Usuario } = require('../models');

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


module.exports = {
    getUsuarios,
    addUsuarios,
    updateUsuario,
    deleteUsuario
};
