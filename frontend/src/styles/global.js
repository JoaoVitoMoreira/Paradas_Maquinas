import { createGlobalStyle } from "styled-components";
import 'react-toastify/dist/ReactToastify.css'; 

const Global = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Poppins', sans-serif;
        background-color: #f2f2f2;
    }

    html, body, #root {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }

    .Toastify__toast-body {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .Toastify__toast-body > svg {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
    }
`;

export default Global;