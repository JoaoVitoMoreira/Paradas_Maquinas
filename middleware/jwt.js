const chave_secreta = "jdaghidbacjknaic";

let dadoUsuario = [id_user=1,nome_user='zeca'] 

function gerarTokenJWT(dadosUsuario){
    return jwt.sigm(dadosUsuario,chave_secreta,{expiresIn:'1d'})
}