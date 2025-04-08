import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Form from "../components/form";
import Grid from "../components/grid";
import GlobalStyle from "../styles/global";


const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;



function User() {

    console.log("Componente User foi renderizado");
  // Defina o estado para 'users' e 'onEdit'
  
  const [users, setUsers] = useState();
  const [onEdit, setOnEdit] = useState(null);

  

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/usuarios",{
        withCredentials: true, 
      });
      setUsers(res.data.sort((a, b) => (a.nome_usua > b.nome_usua ? 1 : -1)));
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      toast.error("Erro ao buscar usuários");
    }
  };

  useEffect(() => {
    console.log("👀 Usuários page montada");
    getUsers(); // Chama a função para buscar os usuários quando o componente é montado
  }, []);

  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} getUsers={getUsers} />
      </Container>
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </>
  );
}

export default User;
