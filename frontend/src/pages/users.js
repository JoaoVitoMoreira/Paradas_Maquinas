import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import Grid from "../components/grid";
import Form from "../components/form";
import Modal from "../components/Modal";
import { FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 50px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #333;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f7f7f7;
    border-color: #ccc;
    transform: translateY(-2px);
  }
`;

function UserPage() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/usuarios", { withCredentials: true });
      setUsers(res.data.sort((a, b) => (a.nome_usua > b.nome_usua ? 1 : -1)));
    } catch (error) {
      toast.error("Erro ao buscar usuários");
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleAdd = () => {
    setOnEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    if (selectedUser) {
      setOnEdit(selectedUser);
      setIsModalOpen(true);
    } else {
      toast.warn("Por favor, selecione um usuário para alterar.");
    }
  };
  
  const handleDelete = async () => {
    if (selectedUser) {
        if (window.confirm("Tem certeza que deseja excluir o usuário?")) {
            try {
                await axios.delete(`http://localhost:4000/usuarios/${selectedUser.id}`, { withCredentials: true });
                toast.success("Usuário deletado com sucesso!");
                setSelectedUser(null);
                getUsers(); 
            } catch (err) {
                toast.error("Erro ao deletar usuário.");
                console.error(err);
            }
        }
    } else {
        toast.warn("Por favor, selecione um usuário para excluir.");
    }
  };

  return (
    <>
      <PageContainer>
        <Header>
          <Title>Usuários</Title>
        </Header>
        <Grid users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <ActionBar>
          <ActionButton onClick={handleAdd}>
            <FaUserPlus /> Adicionar
          </ActionButton>
          <ActionButton onClick={handleEdit}>
            <FaEdit /> Alterar
          </ActionButton>
          <ActionButton onClick={handleDelete}>
            <FaTrash /> Excluir
          </ActionButton>
        </ActionBar>
      </PageContainer>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Form 
          onEdit={onEdit} 
          setOnEdit={setOnEdit} 
          getUsers={getUsers} 
          closeModal={() => setIsModalOpen(false)} 
        />
      </Modal>

      <ToastContainer autoClose={3000} position="bottom-right" />
    </>
  );
}

export default UserPage;