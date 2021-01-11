import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${p => p.theme.colors.background};
    font-family: Open-Sans, Sans-Serif, Helvetica;
  }

  .float-right {
    float: right;
  }
`;

export default GlobalStyle;