// Arquivo: src/components/ConfirmationModal.js

import React from 'react';
import styled from 'styled-components';
import Modal from './Modal'; // Reutilizando nosso modal base

const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 1rem;
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: #333;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-weight: 500;
  min-width: 120px;

  // Estilo do botão de confirmação (vermelho)
  &.confirm-button {
    background-color: #d9534f;
    border-color: #d43f3a;
    color: white;
    &:hover {
      background-color: #c9302c;
    }
  }

  // Estilo do botão de cancelar (cinza)
  &.cancel-button {
    background-color: #f7f7f7;
    color: #333;
    &:hover {
      background-color: #e9e9e9;
    }
  }
`;

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ConfirmationContainer>
        <Message>{message}</Message>
        <ButtonContainer>
          <Button className="cancel-button" onClick={onClose}>
            Cancelar
          </Button>
          <Button className="confirm-button" onClick={onConfirm}>
            Confirmar Exclusão
          </Button>
        </ButtonContainer>
      </ConfirmationContainer>
    </Modal>
  );
};

export default ConfirmationModal;