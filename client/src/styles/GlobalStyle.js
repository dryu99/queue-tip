import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${p => p.theme.colors.background};
    font-family: 'Roboto Slab', Open-Sans, serif;
  }

  .float-right {
    float: right;
  }
  .float-left {
    float: left;
  }
  .bold {
    font-weight: bold;
  }
  .italic {
    font-style: italic;
  }
  .underline {
    text-decoration: underline;
  }
`;

export default GlobalStyle;