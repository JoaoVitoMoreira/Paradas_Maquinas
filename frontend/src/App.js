import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/form";
import Grid from "./components/grid";
import {useEffect, useState} from "react";
import { toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"

const Container = styled.div`
  width: 100%;
  max-width:800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try{
      const res = await axios.get("http://localhost:4000/usuarios");
      setUsers(res.data.sort((a, b)=>(a.nome_usua > b.nome_usua ? 1 : -1)))
    } catch (error){
      toast.error(error)
    }
  }

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
        <Grid users = {users} setUsers={setUsers} setOnEdit={setOnEdit}  getUsers={getUsers}/>
      </Container>
      <ToastContainer autoClose={3000}/>
      <GlobalStyle/>
    </>
  );
}

export default App;
