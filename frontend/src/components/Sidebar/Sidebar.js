import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';

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

// ... (O início do código permanece o mesmo)
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

const LogoContainer = styled.div`
  padding: 0 1rem 2rem 1rem;
  text-align: center;
`;

const LogoImage = styled.img`
  max-width: 120px;
  height: auto;
`;

const NavList = styled.nav`
  flex-grow: 1;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: #5a6b87;
  margin-bottom: 0.5rem;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &.active {
    background-color: #eef2ff;
    color: #4f46e5;
    font-weight: 600;
  }

  &:hover {
    background-color: #f7f7f7;
  }
`;
const progressBar = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;

const LogoutButton = styled.button`
  position: relative; 
  overflow: hidden; 
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 8px;
  color: #5a6b87;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  min-height: 54px;

  &:hover:not(:disabled) {
    background-color: #f7f7f7;
    color: #d9534f;
  }

  /* O contêiner do ícone */
  .content {
    position: relative;
    z-index: 2;
    /* Adicionado para manter o alinhamento do ícone perfeito */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* A barra de progresso */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0; 
    background-color: #fde2e1; 
    z-index: 1;
  }

  /* Quando o botão estiver carregando */
  &:disabled {
    cursor: not-allowed;
    color: #d9534f; 

    &::after {
      animation: ${progressBar} 1.5s linear forwards; 
    }
  }
`;

const Sidebar = () => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      await signout();
      navigate("/");
    } catch (error) {
      console.error("Falha ao fazer logout:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <SidebarContainer>
      <LogoContainer>
        <LogoImage src="/logo.png" alt="Logo da Empresa" />
      </LogoContainer>

      <NavList>
        {(user?.func_usua === 'administrador' || user?.func_usua === 'analista_pcp') && (
          <>
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
          </>
        )}

        {user?.func_usua === 'operador de máquina' && (
          <StyledNavLink to="/operador">
            <FaPlus /> Lançar Produção
          </StyledNavLink>
        )}

        <StyledNavLink to="/suporte">
          <FaQuestionCircle /> Suporte
        </StyledNavLink>
        <StyledNavLink to="/configuracoes">
          <FaCog /> Configurações
        </StyledNavLink>
        
      </NavList>


      <LogoutButton onClick={handleLogout} title="Sair" disabled={isLoggingOut}>
        <span className="content">
          <FaSignOutAlt size={22} />
        </span>
      </LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;