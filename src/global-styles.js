import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    body {
        font-family: 'NanumSquare', sans-serif;
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: all 0.5s ease-in-out;
    }
    button { 
        cursor: pointer;
        border: none;
        outline: none;
    }
    ol, ul, li {
        list-style: none;
    }
    a {
        text-decoration: none;
        cursor: pointer;
    }
    img {
        width: 100%;
        height: 100%;
    }
`;
