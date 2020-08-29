import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { SNOO_BLUE } from '../src/constants/colors';

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const GlobalStyle = createGlobalStyle`
 * {
    box-sizing: border-box;
  }
  html {
    height: 100%;
    background: hsl(0deg 0% 98%);
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
  return (
    <Provider store={reduxStore}>
      <Component {...pageProps} />
      <GlobalStyle />
    </Provider>
  );
}

export default withReduxStore(MyApp);
