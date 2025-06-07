import React, { useState } from 'react';
import { useAuth } from '../../contexts/useAuth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #d6d3f0; /* Sua cor de fundo */
`;

const FormContainer = styled.form`
  background-color: white;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;

  & > span {
    color: #8b5cf6; /* Sua cor de destaque */
    font-weight: bold;
  }
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin-bottom: 2rem;
`;

const InputArea = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
`;

const Label = styled.label`
  position: absolute;
  top: 13px;
  left: 10px;
  color: #9ca3af;
  pointer-events: none;
  transition: all 0.2s ease-out;
  background-color: white; // Fundo branco para cobrir a linha ao flutuar
  padding: 0 5px; // Espaçamento para não encostar na linha
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 10px;
  border: 1px solid #ddd; // Mantivemos uma borda sutil para o estado inicial
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  background-color: transparent;
  outline: none;

  &:focus {
    border-color: #8b5cf6; // Usa a sua cor roxa no foco
  }

  // Quando o input está focado OU tem algum valor, o Label sobe
  &:focus + ${Label},
  &:not(:placeholder-shown) + ${Label} {
    top: -10px;
    left: 8px;
    font-size: 0.8rem;
    color: #8b5cf6; // Usa a sua cor roxa no foco
  }
`;

const Button = styled.button`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 14px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background-color: #8b5cf6;
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #7c3aed;
  }

  &:disabled {
    background-color: #c4b5fd;
    cursor: not-allowed;
  }
`;

const LoadingBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  width: ${(props) => (props.isLoading ? '100%' : '0%')};
  transition: width 1.5s ease-out;
`;

const ButtonText = styled.span`
  position: relative;
  z-index: 2;
`;

function LoginPage() {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { signin } = useAuth();
    const navigate = useNavigate();
    const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
        const result = await signin(nome, senha);

        if (result.error) {
            setError(result.error);
            setIsSubmitting(false);
        } else if (result.usuario) {
            if (result.usuario.func_usua === 'operador de máquina') {
                navigate('/operador');
            } else {
                navigate('/home');
            }
        }
    } catch (err) {
        setError("Ocorreu um erro inesperado.");
        setIsSubmitting(false);
    }
};
    return (
        <LoginContainer>
            <FormContainer onSubmit={handleLogin}>
                <Title>Bem vindo ao <span>LOGIN</span></Title>
                <Subtitle>Preencha os dados de login para acessar</Subtitle>
                
                <InputArea>
                    <Input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required placeholder=" "/>
                    <Label htmlFor="nome">Usuário</Label>
                </InputArea>

                <InputArea>
                    <Input id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required placeholder=" "/>
                    <Label htmlFor="senha">Senha</Label>
                </InputArea>

                {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

                <Button type="submit" disabled={isSubmitting}>
                    <LoadingBar isLoading={isSubmitting} />
                    <ButtonText>{isSubmitting ? 'ENTRANDO...' : 'ENTRAR'}</ButtonText>
                </Button>
            </FormContainer>
        </LoginContainer>
    );
}

export default LoginPage;