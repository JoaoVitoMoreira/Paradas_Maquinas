// Arquivo: src/pages/users.js (VERSÃO LIMPA E FINAL)

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Não precisa mais do ToastContainer aqui
import styled from "styled-components";
import Grid from "../components/grid";
import Form from "../components/form";
import Modal from "../components/Modal";
import ConfirmationModal from "../components/ConfirmationModal";
import { FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';

// --- Seus componentes de Estilo aqui (PageContainer, Header, etc.) ---
// ... (vou omitir por brevidade, eles estão corretos)

const PageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
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
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  // O estado de isLoading foi removido

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
    setIsFormModalOpen(true);
  };

  const handleEdit = () => {
    if (selectedUser) {
      setOnEdit(selectedUser);
      setIsFormModalOpen(true);
    } else {
      toast.warn("Por favor, selecione um usuário para alterar.");
    }
  };
  
  const handleDelete = () => {
    if (selectedUser) {
      setIsConfirmModalOpen(true);
    } else {
      toast.warn("Por favor, selecione um usuário para excluir.");
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/usuarios/${selectedUser.id}`, { withCredentials: true });
      toast.success("Usuário deletado com sucesso!");
      setSelectedUser(null);
      getUsers();
    } catch (err) {
      toast.error("Erro ao deletar usuário.");
    } finally {
      setIsConfirmModalOpen(false);
    }
  };

  return (
    <>
      <PageContainer>
        <Header>
          <Title>Usuários</Title>
        </Header>

        {/* O Grid com a correção para estado vazio que fizemos antes continua sendo uma boa prática */}
        <Grid users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />

        <ActionBar>
          <ActionButton onClick={handleAdd}><FaUserPlus /> Adicionar</ActionButton>
          <ActionButton onClick={handleEdit}><FaEdit /> Alterar</ActionButton>
          <ActionButton onClick={handleDelete}><FaTrash /> Excluir</ActionButton>
        </ActionBar>
      </PageContainer>
      
      <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)}>
        <Form 
          onEdit={onEdit} 
          setOnEdit={setOnEdit} 
          getUsers={getUsers} 
          closeModal={() => setIsFormModalOpen(false)} 
        />
      </Modal>

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        message={`Tem certeza que deseja excluir o usuário "${selectedUser?.nome_usua}"?`}
      />

      {/* Não precisa mais do ToastContainer aqui, ele deve ficar no App.js */}
    </>
  );
}

export default UserPage;