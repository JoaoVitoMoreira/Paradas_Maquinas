import React, { useState, useEffect } from 'react';
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { useAuth } from '../../contexts/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiUser, FiLock } from "react-icons/fi";


const Login = () => {
  const { signin, signed } = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
 
  const location = useLocation();
  // Redireciona se o usuário já estiver logado
  useEffect(() => {
    if (signed && location.pathname === "/") {
      navigate("/home");
    }
  }, [signed, navigate, location]);
  const handleLogin = async () => {
    if (!nome || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      const res = await signin(nome, senha);
      console.log("🚀 Resultado do signin:", res);
      if (res) {
        setError(res);
        return;
      }

      navigate("/home");
    } catch (error) {
      setError("Erro ao fazer login");
    }
  };

  // Permite pressionar Enter para logar
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <C.Container>
      <C.Content>
        <C.Label>
          Bem vindo ao <C.LoginText>LOGIN</C.LoginText>
        </C.Label>
        <C.Label2>Preencha os dados de login para acessar</C.Label2>

        <Input
          type="text"
          placeholder="Usuário"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            setError("");
          }}
          icon={FiUser}
        />

        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setError("");
          }}
          icon={FiLock}
          onKeyDown={handleKeyPress}
        />

        <C.labelError>{error}</C.labelError>

        <Button Text="ENTRAR" onClick={handleLogin} />
      </C.Content>
    </C.Container>
  );
};

export default Login;
