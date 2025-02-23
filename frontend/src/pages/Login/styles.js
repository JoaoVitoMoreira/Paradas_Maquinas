import styled from "styled-components";
import { FiUser, FiLock } from "react-icons/fi";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  min-height: 100vh;
  width: 100vw;
  background-color: #B9C2F1; /* Fundo lilás */
`;

export const Content = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #0003;
  background-color: white;
  max-width: 400px;
  padding: 60px;
  border-radius: 20px;
  height: 40%;
`;

export const LoginText = styled.span`
  color: #B9C2F1; /* Escolha a cor que quiser */
  font-weight: 700; /* Se quiser deixar em negrito */
`;

export const Label = styled.label` 
  font-size: 22px;
  font-weight: 600;
  color:rgb(5, 5, 5);
`;

export const Label2 = styled.label`
    font-size: 16px;
    color:rgb(124, 124, 124);
`;

export const labelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #676767;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LabelCheckbox = styled.label`
  font-size: 14px;
  color: rgb(124, 124, 124);
`;