import React from "react"
import * as C from "./style"


const Button = ({ Text, onClick, type = "button" }) => {
    return (
        <C.Button type={type} onClick={onClick}>
            {Text}
        </C.Button>        
    );
};

export default Button;