import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: #2f3640;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #353b48;
    font-size: 16px;
    font-family: Roboto, Arial, Helvetica, sans-serif;
    font-weight: 400;
  }

  button {
    cursor: pointer;
  }
`;
