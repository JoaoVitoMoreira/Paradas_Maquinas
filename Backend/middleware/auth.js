const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken;

  console.log("Token recebido no cookie:", token);

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "chave_secreta");
    console.log("Token decodificado com sucesso:", decoded);
    
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Erro ao verificar o token:", error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token expirado' });
    }

    return res.status(403).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;

