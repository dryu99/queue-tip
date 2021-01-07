import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#6a0dad',
    secondary: '#343a40',
    background: '#eaeaea',
    secondaryBackground: 'white',
    // foreground: 'white',
    border: '#d6d6d6'
  }
};

const ThemeProviderWrapper = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;