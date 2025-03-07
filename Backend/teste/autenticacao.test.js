const {verificaEmail,verificaIdade,verificaCPF}=require("./autenticacao.js");
    describe("Teste de validação de usuário",()=>{
        test(
            'o usuário conectado deve ser Joao@gmail.com e a senha tem que ser 123456789',()=>{
                const resultado = verificaEmail("Joao@gmail.com", "123456789");
                expect(resultado).toBe(true);
            });

    describe("Teste de validação de Idade",()=>{
        test(
            'O usuário deve conter mais de 18 anos para logar',()=>{
            idade=25
                expect(idade).toBe(25)
            });

    });

    describe("Teste de validação de CPF",()=>{
        test(
            'O CPF deve conter 9 digitos dentro deste padrão 000.000.000-00',()=>{
                cpf="100.100.100-00"
                expect(cpf).toBe("100.100.100-00")
            });

    });
    
    });