// Arquivo: src/components/Modal.js (VERSÃO COM BOTÃO DE FECHAR)

import React from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  min-width: 400px;
  position: relative; // <-- MUDANÇA 1: Adicionado para ser a referência de posição do botão
`;

// --- NOVO --- Estilo para o botão de fechar
const CloseButton = styled.button`
  position: absolute; // <-- Permite posicionar livremente dentro do container
  top: 15px;          // 15px do topo
  right: 15px;         // 15px da direita
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #aaa;
  cursor: pointer;
  line-height: 1;

  &:hover {
    color: #333;
  }
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* --- NOVO --- Adiciona o botão de fechar aqui dentro */}
        <CloseButton onClick={onClose}>&times;</CloseButton>
        
        {children}
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default Modal;