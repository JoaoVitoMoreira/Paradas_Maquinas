import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: #ffffff;
    height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [cargo, setCargo] = useState("");

    useEffect(() => {
        if (onEdit) {
            setNome(onEdit.nome_usua || "");
            setCargo(onEdit.func_usua || "");
            setSenha("");
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome || (!onEdit && !senha) || !cargo) {
            return toast.warn("Preencha todos os campos obrigatórios!");
        }
        
        const config = { withCredentials: true };

        try {
            if (onEdit) {
                const dadosParaAtualizar = {
                    nome_usua: nome,
                    func_usua: cargo,
                };
                
                if (senha) {
                    dadosParaAtualizar.senha_usua = senha;
                }

                await axios.put(`http://localhost:4000/usuarios/${onEdit.id}`, dadosParaAtualizar, config);
                toast.success("Usuário atualizado com sucesso!");

            } else {

                await axios.post("http://localhost:4000/usuarios", {
                    nome,
                    senha,
                    cargo,
                }, config);
                toast.success("Usuário criado com sucesso!");
            }
           
            setNome("");
            setSenha("");
            setCargo("");
            setOnEdit(null);
            getUsers();

        } catch (error) {
            console.error("Erro ao salvar usuário:", error);
            const errorMessage = error.response?.data?.message || "Erro ao salvar o usuário";
            toast.error(errorMessage);
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <InputArea>
                <Label htmlFor="nome">Nome</Label>
                <Input
                    id="nome"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </InputArea>
            <InputArea>
                <Label htmlFor="senha">Senha</Label>
                <Input
                    id="senha"
                    name="senha"
                    type="password"
                    placeholder={onEdit ? "Deixe em branco para não alterar" : ""}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </InputArea>
            <InputArea>
                <Label htmlFor="cargo">Cargo</Label>
                <Input
                    id="cargo"
                    name="cargo"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                />
            </InputArea>
            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;