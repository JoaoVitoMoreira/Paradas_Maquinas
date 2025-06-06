// src/components/grid.js
import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.cardBackground}; // <-- Usando a cor do tema
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #eee;
  box-shadow: ${(props) => props.theme.shadows.purple};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse; // Tira o espaçamento duplo das bordas
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  // Adiciona o efeito de 'hover' e de 'selecionado'
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


const Grid = ({ users, selectedUser, setSelectedUser }) => {
  return (
    <GridContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Código</Th>
            <Th>Nome</Th>
            <Th>Cargo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((item) => (
              <Tr 
                key={item.id} 
                onClick={() => setSelectedUser(item)}
                isSelected={selectedUser && selectedUser.id === item.id}
              >
                <Td>{item.id}</Td>
                <Td>{item.nome_usua}</Td>
                <Td>{item.func_usua}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="3">Nenhum usuário encontrado</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </GridContainer>
  );
};

export default Grid;