const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUsuario = async (req, res) => {
    const {nome, senha} = req.body;
    try {
        const result = await Usuario.findOne({where : {nome_usua : nome}});

        if( result.rows.lenght === 0){
            return res.status(401).json({ message: "Usuário não encontrado" });
        }

        const usuario = result.rows[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha_usua);

        if(!senhaCorreta) {
            return res.status(401).json({message:"Senha Incorreta"});
        };

        const payload = {
            id: usuario.id_usua,
            nome: usuario.nome_usua,
            tipo: usuario.senha_usua
        }

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRES
        });
        
        const refreshToken = crypto.randomBytes(64).toString("hex");
        const refreshTokenHash = await bcrypt.hash(refreshToken, 12);
        const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_DIAS * 24 * 60 * 60 * 1000);

        await refreshToken.create({
        
        });



    } catch(erro) {

    };
};

const refreshUsuario = async (req, res) => {

};

const logoutUsuario = async (req, res) => {

};

const listarSessoesUsuario = async (req, res) => {

};

const revogarSessaoUsuario = async (req, res) => {

};

module.exports = {
    loginUsuario,
    refreshUsuario,
    logoutUsuario,
    listarSessoesUsuario,
    revogarSessaoUsuario
};