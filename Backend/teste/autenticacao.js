function verificaEmail(email,senha){
    return email === "Joao@gmail.com" && senha === "123456789"  
};

function verificaIdade(idade){

    if(idade >=18 && idade<100){
        return true
    }
}

function verificaCPF(){
    const regex = ("\d{3}\.\d{3}\.\d{3}-\d{2}")
};

module.exports= {verificaEmail,verificaIdade,verificaCPF};

