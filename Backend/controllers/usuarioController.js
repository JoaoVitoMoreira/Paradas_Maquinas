// Arquivo: controllers/usuarioController.js (VERSÃO COMPLETA E CORRIGIDA)

const { Usuario, Sessao } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// --- Função Auxiliar ---
const omitirSenha = (usuario) => {
    if (!usuario) return null;
    // O .get({ plain: true }) é importante para converter a instância do Sequelize em um objeto simples
    const { senha_usua, ...usuarioSemSenha } = usuario.get({ plain: true });
    return usuarioSemSenha;
};


// --- Funções de Gerenciamento de Usuário (CRUD) - O CÓDIGO QUE FALTAVA ---
const getUsuarios = async (_, res) => {
    try {
        const usuarios = await Usuario.findAll({ attributes: { exclude: ['senha_usua'] } });
        return res.status(200).json(usuarios);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const addUsuarios = async (req, res) => {
    try {
        const senhaHash = bcrypt.hashSync(req.body.senha, 12);
        const novoUsuario = await Usuario.create({
            nome_usua: req.body.nome,
            senha_usua: senhaHash,
            func_usua: req.body.cargo,
        });
        return res.status(201).json(omitirSenha(novoUsuario));
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: "O nome de usuário já existe." });
        }
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
        const dadosParaAtualizar = { nome_usua, func_usua };
        if (senha_usua) {
            dadosParaAtualizar.senha_usua = bcrypt.hashSync(senha_usua, 12);
        }
        await usuario.update(dadosParaAtualizar);
        return res.status(200).json({ message: "Usuário atualizado com sucesso!", data: omitirSenha(usuario) });
    } catch (error) {
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
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar o usuário", error: error.message });
    }
};


// --- Funções de Autenticação e Sessão ---
const loginUsuario = async (req, res) => {
    const { nome, senha } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { nome_usua: nome } });
        if (!usuario || !(await bcrypt.compare(senha, usuario.senha_usua))) {
            return res.status(401).json({ message: "Usuário ou senha incorretos." });
        }
        const payload = { id: usuario.id, nome: usuario.nome_usua, tipo: usuario.func_usua };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = crypto.randomBytes(64).toString("hex");
        const refreshTokenHash = await bcrypt.hash(refreshToken, 12);
        const expiresAt = new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRES_DAYS || 30) * 24 * 60 * 60 * 1000);
        await Sessao.create({ token: refreshTokenHash, id_usua: usuario.id, expires_at: expiresAt });
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict', path: '/', maxAge: 15 * 60 * 1000 });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict', path: '/', expires: expiresAt });
        return res.status(200).json({ usuario: omitirSenha(usuario) });
    } catch (erro) {
        console.error("Erro no login:", erro);
        return res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
    }
};

const refreshUsuario = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(401).json({ message: "Refresh token não fornecido." });
    try {
        const sessoes = await Sessao.findAll();
        let sessaoCorreta = null;
        for (const sessao of sessoes) {
            if (await bcrypt.compare(refreshToken, sessao.token)) {
                sessaoCorreta = sessao;
                break;
            }
        }
        if (!sessaoCorreta) return res.status(403).json({ message: "Sessão inválida." });
        if (new Date() > new Date(sessaoCorreta.expires_at)) {
            await sessaoCorreta.destroy();
            return res.status(403).json({ message: "Sessão expirada. Faça login novamente." });
        }
        const usuario = await Usuario.findByPk(sessaoCorreta.id_usua);
        if (!usuario) return res.status(403).json({ message: "Usuário da sessão não encontrado." });
        const payload = { id: usuario.id, nome: usuario.nome_usua, tipo: usuario.func_usua };
        const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict', path: '/', maxAge: 15 * 60 * 1000 });
        return res.status(200).json({ message: "Token renovado com sucesso." });
    } catch (erro) {
        console.error("Erro ao atualizar token:", erro);
        return res.status(500).json({ message: "Ocorreu um erro interno." });
    }
};

const logoutUsuario = async (req, res) => {
    const { refreshToken } = req.cookies;
    try {
        if (refreshToken) {
            const sessoes = await Sessao.findAll();
            for (const sessao of sessoes) {
                if (await bcrypt.compare(refreshToken, sessao.token)) {
                    await sessao.destroy();
                    break;
                }
            }
        }
        res.clearCookie('accessToken', { path: '/' });
        res.clearCookie('refreshToken', { path: '/' });
        return res.status(200).json({ message: "Logout realizado com sucesso." });
    } catch (erro) {
        console.error("Erro no logout:", erro);
        return res.status(500).json({ message: "Ocorreu um erro interno." });
    }
};

const getUsuarioAutenticado = async (req, res) => {
    const usuarioId = req.user.id;

    try {
        const usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            return res.status(404).json({ message: "Usuário do token não encontrado." });
        }
        return res.status(200).json({ usuario: omitirSenha(usuario) });

    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar dados do usuário." });
    }
};

// --- EXPORTAÇÃO FINAL E COMPLETA ---
module.exports = {
    getUsuarios,
    addUsuarios,
    updateUsuario,
    deleteUsuario,
    loginUsuario,
    refreshUsuario,
    logoutUsuario,
    getUsuarioAutenticado
};