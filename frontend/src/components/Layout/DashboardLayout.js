import React from 'react';
import styled from 'styled-components';
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom'; 

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const ContentContainer = styled.main`
  flex-grow: 1;
  overflow-y: auto;
  padding: 2rem 3rem;
`;


const DashboardLayout = () => { 
  return (
    <LayoutContainer>
      <Sidebar />
      <ContentContainer>
        <Outlet /> 
      </ContentContainer>
    </LayoutContainer>
  );
};

export default DashboardLayout;