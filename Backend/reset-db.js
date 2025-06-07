const { Usuario, sequelize } = require('./models');

const nomeDoUsuarioParaDeletar = 'Carlos'; 

const deletarUsuario = async () => {
  console.log(`--- Iniciando a exclusão do usuário: "${nomeDoUsuarioParaDeletar}" ---`);
  
  try {
    const resultado = await Usuario.destroy({
      where: {
        nome_usua: nomeDoUsuarioParaDeletar
      }
    });

    if (resultado > 0) {
      console.log(`✅ Sucesso! O usuário '${nomeDoUsuarioParaDeletar}' foi deletado.`);
    } else {
      console.log(`- Aviso: Nenhum usuário com o nome '${nomeDoUsuarioParaDeletar}' foi encontrado para deletar.`);
    }

  } catch (error) {
    console.error('❌ Erro ao executar a exclusão:', error);
  } finally {
    await sequelize.close();
    console.log('Conexão com o banco de dados fechada.');
  }
};

deletarUsuario();