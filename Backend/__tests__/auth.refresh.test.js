const request = require('supertest');
const app = require('../app');
const { Usuario, Sessao, sequelize } = require('../models');
const bcrypt = require('bcryptjs');

describe('AuthController - Refresh Token', () => {
  const usuarioTeste = {
    nome: 'refreshtest@email.com',
    senha: '123456',
    cargo: 'professor'
  };

  let cookies;

  beforeAll(async () => {
    await Sessao.destroy({ truncate: true, cascade: true });
    await Usuario.destroy({ truncate: true, cascade: true });

    const senhaHash = bcrypt.hashSync(usuarioTeste.senha, 12);
    await Usuario.create({
        nome_usua: usuarioTeste.nome,
        senha_usua: senhaHash,
        func_usua: usuarioTeste.cargo
    });

    const loginResponse = await request(app)
      .post('/login')
      .send({ nome: usuarioTeste.nome, senha: usuarioTeste.senha });

    cookies = loginResponse.headers['set-cookie'];
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('deve gerar novo accessToken com refreshToken válido', async () => {
    const response = await request(app)
      .post('/refresh')
      .set('Cookie', cookies); 

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Token renovado com sucesso.');
    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([expect.stringContaining('accessToken=')])
    );
  });

  it('deve retornar erro 403 com refreshToken inválido', async () => {
    const response = await request(app)
      .post('/refresh')
      .set('Cookie', ['refreshToken=token-falso-123']);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message', 'Sessão inválida.');
  });
});