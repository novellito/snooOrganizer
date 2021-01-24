import { createGlobalStyle } from 'styled-components';
export const GlobalStyles = createGlobalStyle`
  body, html {
    background: ${({ theme }: any) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  `;
