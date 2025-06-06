// src/components/Sidebar/Sidebar.js (VERSÃO FINAL COM ÍCONES)

import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';

// 1. Importando os ícones
import {
  FaTachometerAlt,
  FaUsers,
  FaChartLine,
  FaFileAlt,
  FaFileContract,
  FaQuestionCircle,
  FaCog,
  FaPlus,
  FaSignOutAlt
} from 'react-icons/fa';

const SidebarContainer = styled.aside`
  width: 260px;
  flex-shrink: 0;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem 1rem;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.05);
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  padding: 0 1rem 2rem 1rem;
  color: #333;
`;

const NavList = styled.nav`
  flex-grow: 1;
`;

// 2. Ajustando o estilo dos links para incluir ícones e transição
const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 15px; // Espaço entre o ícone e o texto
  padding: 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: #5a6b87;
  margin-bottom: 0.5rem;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out; // Transição suave

  &.active {
    background-color: #eef2ff;
    color: #4f46e5;
    font-weight: 600;
  }

  &:hover {
    background-color: #f7f7f7;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 15px; // Espaço entre o ícone e o texto
  padding: 1rem;
  background: none;
  border: none;
  text-align: left;
  font-size: 1rem;
  color: #5a6b87;
  cursor: pointer;
  width: 100%;
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out; // Transição suave

  &:hover {
    background-color: #f7f7f7;
    color: #d9534f;
  }
`;


const Sidebar = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signout();
    navigate("/");
  };

  return (
    <SidebarContainer>
      <Logo>LOGO</Logo>
      <NavList>
        {/* 3. Adicionando os componentes de ícone antes do texto */}
        <StyledNavLink to="/home">
          <FaTachometerAlt /> Dashboard
        </StyledNavLink>
        <StyledNavLink to="/usuarios">
          <FaUsers /> Usuários
        </StyledNavLink>
        <StyledNavLink to="/analises">
          <FaChartLine /> Análises
        </StyledNavLink>
        <StyledNavLink to="/log">
          <FaFileAlt /> Log
        </StyledNavLink>
        <StyledNavLink to="/relatorios">
          <FaFileContract /> Relatórios
        </StyledNavLink>
        <StyledNavLink to="/suporte">
          <FaQuestionCircle /> Suporte
        </StyledNavLink>
        <StyledNavLink to="/configuracoes">
          <FaCog /> Configurações
        </StyledNavLink>
        <StyledNavLink to="/adicionar">
          <FaPlus /> Adicionar
        </StyledNavLink>
      </NavList>
      <LogoutButton onClick={handleLogout}>
        <FaSignOutAlt /> SAIR
      </LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;