const { Apontamento } = require('../models');

exports.createApontamento = async (req, res) => {
  try {
    const { id } = req.user; 
    const novoApontamento = await Apontamento.create({ ...req.body, id_usua: id });
    return res.status(201).json(novoApontamento);
  } catch (error) {
    console.error("Erro ao criar apontamento:", error);
    return res.status(500).json({ message: "Erro interno ao salvar dados." });
  }
};