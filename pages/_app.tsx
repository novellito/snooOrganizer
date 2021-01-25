import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { SNOO_BLUE } from '../src/constants/colors';
import React from 'react';
import { lightTheme, darkTheme } from '../src/constants/Theme';
import { useDarkMode } from '../src/hooks/useDarkMode';
import { GlobalStyles } from '../src/components/GlobalStyles';
import ThemeToggler from '../src/components/ThemeToggler';

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const GlobalStyle = createGlobalStyle`
 * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    height: 100%;
    font-family: 'Open Sans', sans-serif; /* for text body */
    font-family: 'Rubik', sans-serif; /* for headers */
  }
  a {
    color: ${SNOO_BLUE};
  }
`;

interface AppPropsWithRedux extends AppProps {
  reduxStore: any;
}

function MyApp({ Component, pageProps, reduxStore }: AppPropsWithRedux) {
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  if (!mountedComponent) return <div />;

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <ThemeToggler toggleTheme={themeToggler} theme={theme} />
        <GlobalStyles />
        <Provider store={reduxStore}>
          <Component {...pageProps} />
          <GlobalStyle />
        </Provider>
      </>
    </ThemeProvider>
  );
}

export default withReduxStore(MyApp);
