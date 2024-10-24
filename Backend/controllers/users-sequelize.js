const sequelize = require('../cnx.js');
const { Usuario } = require('../models');

const getUsuarios = async (_, res) => {
    try {
        const usuarios = await Usuario.findAll();
        console.log('Dados retornados:', usuarios); // Log para verificar os dados retornados

        return res.status(200).json(usuarios);
    } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        return res.status(500).json({ error: err.message, details: err });
    }
};




module.exports = getUsuarios;
