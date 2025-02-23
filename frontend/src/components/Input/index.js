import React, {useState} from "react"
import * as C from "./style"
import { FiUser, FiLock } from "react-icons/fi";

const Input = ({ type, placeholder, value, onChange, icon: Icon }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <C.InputContainer>
      {Icon && <C.InputIcon>{<Icon />}</C.InputIcon>} 
      <C.Input
        value={value}
        onChange={onChange}
        type={type}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(value !== "")}
        placeholder=" "
      />
      <C.Label isFocused={isFocused || value !== ""}>{placeholder}</C.Label>
    </C.InputContainer>
  );
};

export default Input;