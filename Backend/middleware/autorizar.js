module.exports = (...tiposPermitidos) => {
  return (req, res, next) => {
    const usuario = req.user;

    if (!usuario || !usuario.tipo) {
      return res.status(403).json({ erro: 'Usuário não autenticado ou sem tipo definido.' });
    }

    if (!tiposPermitidos.includes(usuario.tipo)) {
      return res.status(403).json({ erro: 'Acesso não autorizado para seu perfil.' });
    }

    next();
  };
};
