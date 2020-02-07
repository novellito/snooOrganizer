// import styled from 'styled-components';
import { useEffect, useState, useCallback } from 'react';
import Button from '../components/Button';
import btoa from 'btoa';
import { ENDPOINT_DOMAIN, CLIENT_ID } from '../constants/constants';
import { useGlobalMessage } from '../hooks/useWindowEvent';
// const AuthenticateWrapper = styled.button`
//   color: teal;
//   font-size: 2em;
// `;

function getAuthUrl({
  clientId,
  scope,
  redirectUri,
  permanent,
  state,
  endpointDomain
}: any) {
  console.log('LE STAE', state);
  if (
    !(
      Array.isArray(scope) &&
      scope.length &&
      scope.every(scopeValue => scopeValue && typeof scopeValue === 'string')
    )
  ) {
    throw new TypeError(
      'Missing `scope` argument; a non-empty list of OAuth scopes must be provided'
    );
  }
  return `
        https://www.${endpointDomain}/api/v1/authorize?
        client_id=${encodeURIComponent(clientId)}
        &response_type=code
        &state=${encodeURIComponent(state)}
        &redirect_uri=${encodeURIComponent(redirectUri)}
        &duration=${permanent ? 'permanent' : 'temporary'}
        &scope=${encodeURIComponent(scope.join(' '))}
      `.replace(/\s/g, '');
}

// interface AuthenticateProps {
//   text?: string;
//   click?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
// }
export const Authenticate = () => {
  // export const Authenticate = (props: AuthenticateProps) => {
  const [state, setUrlState] = useState('');
  const [authWindow, setAuthWindow] = useState();

  const generateTokens = () => {
    // const scope = ['account', 'read'];
    const scope = ['identity', 'read'];
    const permanent = false; // or true - not sure yet
    const redirectUri = window.location.origin + window.location.pathname;

    setAuthWindow(
      window.open(
        getAuthUrl({
          clientId: CLIENT_ID,
          scope,
          redirectUri,
          permanent,
          state,
          endpointDomain: ENDPOINT_DOMAIN
        })
      )
    );
  };

  useEffect(() => {
    const searchParams = new URL(window.location.toString()).searchParams;
    if (window.opener && searchParams.has('code')) {
      console.log('POST');
      window.opener.postMessage(
        { code: searchParams.get('code'), state: searchParams.get('state') },
        window.location.origin
      );
    }

    setUrlState(
      btoa(
        [...window.crypto.getRandomValues(new Uint8Array(32))]
          .map(num => String.fromCharCode(num))
          .join('')
      )
    );
  }, []);

  const callback = useCallback(
    (event: any) => {
      if (
        event.origin === window.location.origin &&
        event.data.state === state
      ) {
        authWindow.close();
      }
    },
    [state, authWindow]
  );

  useGlobalMessage(callback);

  return (
    <div>
      hello!
      <Button click={() => generateTokens()} text="Login"></Button>
    </div>
  );
};

export default Authenticate;
