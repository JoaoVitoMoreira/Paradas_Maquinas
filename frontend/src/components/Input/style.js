import styled from "styled-components";
import { FiUser, FiLock } from "react-icons/fi";

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 10px;
  color: #aaa;
  font-size: 18px;
`;

export const Label = styled.label`
  position: absolute;
  left: 40px; /* Ajustado para alinhar com o input */
  top: ${({ isFocused }) => (isFocused ? "5px" : "50%")};
  transform: translateY(-50%);
  font-size: ${({ isFocused }) => (isFocused ? "12px" : "16px")};
  color: #aaa;
  transition: all 0.3s ease-in-out;
  pointer-events: none;
`;
export const Input = styled.input`
  outline: none;
  padding: 10px 10px 10px 40px; 
  width: 100%;
  font-size: 16px;
  background-color: rgb(255, 255, 255);
  border: none;
  border-bottom: 1px solid #999;
  transition: all 0.2s ease;

  &:focus {
    border-bottom: 1px solid #000;
    padding-top: 24px; /* Aumenta a área de escrita */
  }

  &:focus + ${Label},
  &:not(:placeholder-shown) + ${Label} {
    top: 10px;
    font-size: 12px;
    color: #000;
  }
`;