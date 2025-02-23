import React, {useState} from 'react'
import Input from "../../components/Input"
import Button from "../../components/Button"
import * as C from "./styles"
import { Link,useNavigate } from 'react-router-dom'
import useAuth from '../../contexts/hooks/useAuth'
import styled from 'styled-components'
import { FiUser, FiLock } from "react-icons/fi";

const Login = () => {
    const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [conectado, setConectado] = useState(false); 

  const handleLogin = () => {
    if (!email | !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = signin(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
  };

  return (
    <C.Container>
      <C.Content>
      <C.Label>
        Bem vindo ao <C.LoginText>LOGIN</C.LoginText>
        </C.Label>
      <C.Label2>Preencha os dados de login para acessar</C.Label2>
        <Input
          type="email"
          placeholder="Usuário"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
          icon={FiUser} 

        />
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
          icon={FiLock} 
        />
        <C.labelError>{error}</C.labelError>

       
       <C.CheckboxContainer>
          <input 
            type="checkbox" 
            checked={conectado}
            onChange={() => setConectado(!conectado)} 
          />
          <C.LabelCheckbox>Manter-me conectado</C.LabelCheckbox>
        </C.CheckboxContainer>

        <Button Text="ENTRAR" onClick={handleLogin} />
      </C.Content>
    </C.Container>
  );
};
export default Login;