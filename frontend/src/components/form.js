import React, {useRef} from "react";
import styled from "styled-components";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color:#FFF;
    padding: 20px;
    box-shadow: 0px 0px 5px #CCC;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #BBB;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2C73D2;
    color: #FFFFFF;
    height: 42px;
`;

const Form = ({onEdit}) => {
    const ref = useRef();
    
    return (    
        <FormContainer>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome"/>
            </InputArea>
            <InputArea>
                <Label>Senha</Label>
                <Input name="senha" type="password"/>
            </InputArea>
            <InputArea>
                <Label>Cargo</Label>
                <Input name="cargo"/>
            </InputArea>
            <Button type="submit">SALVAR</Button>        
        </FormContainer>
    );

};

export default Form;