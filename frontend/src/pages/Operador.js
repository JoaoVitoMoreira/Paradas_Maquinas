// Arquivo: src/pages/Operador.js (VERSÃO FINAL E CORRIGIDA)

import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

// --- Componentes de Estilo ---

// Este container agora é apenas um invólucro simples, sem estilos de posicionamento
const PageContainer = styled.div`
  width: 100%;
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 900px;
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  margin: 0 auto; // Centraliza o formulário na área de conteúdo
  box-shadow: ${(props) => props.theme.shadows.purple};
`;

const Header = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
    margin-bottom: 8px;
    font-weight: 500;
    color: #555;
    font-size: 0.9rem;
`;

const Input = styled.input`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #8b5cf6;
      box-shadow: 0 0 0 2px #e9d5ff;
    }
`;

const SubmitButton = styled.button`
    padding: 12px 25px;
    border: none;
    background-color: #2c73d2;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
`;

// REMOVEMOS a definição do LogoutButton daqui

// --- Componente Principal da Página ---

function OperadorPage() {
    // A lógica de estado e as funções (useState, handleChange, handleSubmit) permanecem as mesmas
    const [formData, setFormData] = useState({
        cod_servico: '', descricao: '', tempo_inicial: '', tempo_final: '',
        quantidade: '', unidade: '', ordem_producao: ''
    });
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/apontamentos', formData, { withCredentials: true });
            toast.success("Apontamento salvo com sucesso!");
            setFormData({
                cod_servico: '', descricao: '', tempo_inicial: '', tempo_final: '',
                quantidade: '', unidade: '', ordem_producao: ''
            });
        } catch (error) {
            toast.error("Erro ao salvar apontamento.");
            console.error(error);
        }
    };

  return (
    // O PageContainer agora só serve para organizar o conteúdo da página
    <PageContainer>
        <FormContainer onSubmit={handleSubmit}>
            <Header>Lançar Produção</Header>
            <FormGrid>
                <InputGroup>
                    <Label>Cód. Produto/Serviço</Label>
                    <Input name="cod_servico" onChange={handleChange} value={formData.cod_servico} />
                </InputGroup>
                <InputGroup className="full-width">
                    <Label>Descrição do Produto/Serviço</Label>
                    <Input name="descricao" onChange={handleChange} value={formData.descricao} />
                </InputGroup>
                <InputGroup>
                    <Label>Tempo Inicial</Label>
                    <Input name="tempo_inicial" type="time" onChange={handleChange} value={formData.tempo_inicial} />
                </InputGroup>
                <InputGroup>
                    <Label>Tempo Final</Label>
                    <Input name="tempo_final" type="time" onChange={handleChange} value={formData.tempo_final} />
                </InputGroup>
                <InputGroup>
                    <Label>Ordem de Produção</Label>
                    <Input name="ordem_producao" onChange={handleChange} value={formData.ordem_producao} />
                </InputGroup>
                <InputGroup>
                    <Label>Quantidade Produzida</Label>
                    <Input name="quantidade" type="number" onChange={handleChange} value={formData.quantidade} />
                </InputGroup>
                <InputGroup>
                    <Label>Unidade</Label>
                    <Input name="unidade" onChange={handleChange} value={formData.unidade} />
                </InputGroup>
            </FormGrid>
            <div style={{marginTop: '2rem', display: 'flex', justifyContent: 'flex-end'}}>
                <SubmitButton type="submit">Salvar Apontamento</SubmitButton>
            </div>
        </FormContainer>

        {/* REMOVEMOS o LogoutButton daqui, pois ele já existe na Sidebar */}
        
        <ToastContainer autoClose={3000} position="bottom-right"/>
    </PageContainer>
  )
}

export default OperadorPage;