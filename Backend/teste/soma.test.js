    const soma = require("../../soma");
describe("testes de função de soma!",()=>{
    test(
        'soma de 2 mais 3 deve ser 5',()=>{
        expect(soma(2,3)).toBe(5);
        },
        'soma de 176.402 mais 235.970 deve ser 412.372',()=>{
            expect(soma(176402,235970)).toBe(412372);
        }
        );
    
        test(
            'soma de -2 mais -7 deve ser -9',()=>{
        expect(soma(-2,-7)).toBe(-9);
        }
        )
    
        test(
            'soma de 176.402 mais 235.970 deve ser 412.372',()=>{
            expect(soma(176402,235970)).toBe(412372);
        }
        ); 
});
   