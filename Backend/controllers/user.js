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

const loginUsuario = async (req, res) => {
  const { nome, senha } = req.body;
  const q = "SELECT * FROM usuarios WHERE nome_usua = $1";
  try {
    const result = await db.query(q, [nome]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const usuario = result.rows[0];

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_usua);
    if (!senhaCorreta) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const payload = {
      id: usuario.id_usua,
      nome: usuario.nome_usua,
      tipo: usuario.func_usua,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES,
    });

    const refreshToken = crypto.randomBytes(64).toString("hex");
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_DIAS * 24 * 60 * 60 * 1000);

    await db.query(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)",
      [usuario.id_usua, refreshToken, expiresAt]
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: REFRESH_TOKEN_EXPIRES_DIAS * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login bem-sucedido" });

  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ message: "Erro interno" });
  }
};

const refreshUsuario = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token não fornecido." });
  }

  try {
    const q = "SELECT * FROM refresh_tokens WHERE token = $1 AND expires_at > NOW()";
    const result = await db.query(q, [refreshToken]);

    if (result.rows.length === 0) {
      return res.status(403).json({ message: "Refresh token inválido ou expirado." });
    }

    const tokenData = result.rows[0];

    const userQuery = await db.query("SELECT * FROM usuarios WHERE id_usua = $1", [tokenData.user_id]);
    const usuario = userQuery.rows[0];

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const payload = {
      id: usuario.id_usua,
      nome: usuario.nome_usua,
      tipo: usuario.func_usua,
    };

    const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES,
    });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ message: "Access token renovado com sucesso." });

  } catch (err) {
    console.error("Erro no refresh:", err);
    res.status(500).json({ message: "Erro interno ao renovar token." });
  }
};

const logoutUsuario = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({ message: "Nenhum refresh token fornecido." });
  }

  try {
    await db.query("DELETE FROM refresh_tokens WHERE token = $1", [refreshToken]);

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    });

    res.status(200).json({ message: "Logout realizado com sucesso." });

  } catch (err) {
    console.error("Erro no logout:", err);
    res.status(500).json({ message: "Erro ao fazer logout." });
  }
};

const listarSessoesUsuario = async (req, res) => {
  const usuario = req.user;

  try {
    const result = await db.query(
      "SELECT id, token, created_at, expires_at FROM refresh_tokens WHERE user_id = $1 ORDER BY created_at DESC",
      [usuario.id]
    );

    res.status(200).json({ sessoes: result.rows });

  } catch (err) {
    console.error("Erro ao listar sessões:", err);
    res.status(500).json({ message: "Erro ao buscar sessões." });
  }
};

const revogarSessaoUsuario = async (req, res) => {
  const usuario = req.user;
  const sessaoId = parseInt(req.params.id);

  if (isNaN(sessaoId)) {
    return res.status(400).json({ message: "ID inválido." });
  }

  try {
    const result = await db.query(
      "SELECT * FROM refresh_tokens WHERE id = $1 AND user_id = $2",
      [sessaoId, usuario.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Sessão não encontrada." });
    }

    await db.query("DELETE FROM refresh_tokens WHERE id = $1", [sessaoId]);

    res.status(200).json({ message: "Sessão revogada com sucesso." });

  } catch (err) {
    console.error("Erro ao revogar sessão:", err);
    res.status(500).json({ message: "Erro ao revogar sessão." });
  }
};

module.exports = {
    getUsuarios,
    addUsuarios,
    updateUsuario,
    deleteUsuario,
    loginUsuario,
    refreshUsuario,
    logoutUsuario,
    listarSessoesUsuario,
    revogarSessaoUsuario
};