import React from "react";
import styled from "styled-components";
import { FaInbox } from 'react-icons/fa';

const GridContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #eee;
  box-shadow: 0px 4px 12px rgba(79, 70, 229, 0.1); // Exemplo de sombra
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#eef2ff" : "transparent")};

  &:hover {
    background-color: #f7f7f7;
  }
`;

const Th = styled.th`
  text-align: left;
  border-bottom: 1px solid #ddd;
  padding: 1rem;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.8rem;
`;

const Td = styled.td`
  padding: 1rem;
  color: #374151;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  color: #6b7280;

  /* A linha mais importante: controla o tamanho do ícone */
  svg {
    font-size: 48px;
    margin-bottom: 1rem;
    color: #9ca3af;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0 0 0.5rem 0;
  }
`;


const Grid = ({ users, selectedUser, setSelectedUser }) => {
  const handleRowClick = (user) => {
    if (selectedUser && selectedUser.id === user.id) {
      setSelectedUser(null); 
    } else {
      setSelectedUser(user); 
    }
  };

  return (
    <GridContainer>
      {Array.isArray(users) && users.length > 0 ? (
        <Table>
          <Thead>
            <Tr style={{cursor: 'default'}}>
              <Th>Código</Th>
              <Th>Nome</Th>
              <Th>Cargo</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((item) => (
              <Tr
                key={item.id || item.id_usua} 
                onClick={() => handleRowClick(item)}
                isSelected={selectedUser && (selectedUser.id === item.id || selectedUser.id_usua === item.id_usua)}
              >
                <Td>{item.id || item.id_usua}</Td>
                <Td>{item.nome_usua}</Td>
                <Td>{item.func_usua}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <EmptyStateContainer>
          <FaInbox />
          <h3>Nenhum usuário encontrado</h3>
        </EmptyStateContainer>
      )}
    </GridContainer>
  );
};

export default Grid;