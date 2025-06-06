// Arquivo: src/styles/global.js

import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        /* APLICA A FONTE A TODA A APLICAÇÃO */
        font-family: 'Poppins', sans-serif;
        background-color: #f2f2f2;
    }

    html, body, #root {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }
`;

export default Global;