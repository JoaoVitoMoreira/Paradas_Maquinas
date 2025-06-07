// Arquivo: src/pages/Home.js (VERSÃO COMPLETA E CORRIGIDA)

import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/useAuth';

// --- DEFINIÇÃO DE TODOS OS COMPONENTES DE ESTILO ---

const HomePageContainer = styled.div`
  width: 100%;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2.5rem;
`;

const WelcomeContainer = styled.div``;

const WelcomeTitle = styled.h2`
  font-size: 1.8rem;
  color: #111827;
  font-weight: bold;

  & > strong {
    color: #8b5cf6;
  }
`;

const DateDisplay = styled.p`
  color: #6b7280;
  font-size: 1rem;
  margin-top: 4px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  color: #374151;

  & > span {
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #6b7280;
  }
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #111827;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.cardBackground};
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  color: ${(props) => props.theme.colors.text};
  font-weight: 500;
  text-align: center;
  box-shadow: ${(props) => props.theme.shadows.purple};
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 6px 25px ${(props) => props.theme.colors.shadowPurple};
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;


// --- COMPONENTES FUNCIONAIS ---

const Header = () => {
  const { user } = useAuth();
  const today = new Date();
  const dateString = today.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });

  return (
    <HeaderContainer>
      <WelcomeContainer>
        <WelcomeTitle>Bem Vindo, <strong>{user?.nome_usua}!</strong></WelcomeTitle>
        <DateDisplay>{dateString}</DateDisplay>
      </WelcomeContainer>
      <UserProfile>
        <span>{user?.func_usua}</span>
        <UserAvatar>{user?.nome_usua?.charAt(0).toUpperCase()}</UserAvatar>
      </UserProfile>
    </HeaderContainer>
  );
};

// Este componente precisa estar aqui para ser usado
const DashboardCard = ({ title }) => {
  return <Card>{title}</Card>;
};


// --- COMPONENTE PRINCIPAL DA PÁGINA HOME ---

function Home() {
  return (
    <HomePageContainer>
      {/* O return precisa renderizar o Header E a GridContainer */}
      <Header />
      <GridContainer>
        <DashboardCard title="Qualidade" />
        <DashboardCard title="Disponibilidade" />
        <DashboardCard title="Perfomance" />
        <DashboardCard title="Produtividade" />
      </GridContainer>
    </HomePageContainer>
  );
}

export default Home;