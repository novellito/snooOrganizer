// import styled from 'styled-components';
import { useEffect, useState, useCallback } from 'react';
import Button from '../components/Button';
import btoa from 'btoa';
import {
  ENDPOINT_DOMAIN,
  CLIENT_ID,
  REDDIT_SCOPE
} from '../constants/constants';
import { useGlobalMessage } from '../hooks/useWindowEvent';
import { AuthURLParams } from '../types/types';
import axios from 'axios';
import { IUserInfo } from '../interfaces/interfaces';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

// const AuthenticateWrapper = styled.button`
//   color: teal;
//   font-size: 2em;
// `;

export function getAuthUrl({
  clientId,
  scope,
  state,
  endpointDomain
}: AuthURLParams): string {
  const permanent = false; // user will have to reauthenticate after an hour
  const redirectUri = window.location.origin + window.location.pathname;
  console.log(state);
  if (
    !(
      Array.isArray(scope) &&
      scope.length &&
      scope.every((scopeValue) => scopeValue && typeof scopeValue === 'string')
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

export async function fetchUserContent(code: string): Promise<IUserInfo> {
  const { data } = await axios.post('/api/userContent', { code });
  console.log(data);
  return data.content;
}

export const Authenticate = () => {
  const [state, setUrlState] = useState('');
  const [authWindow, setAuthWindow] = useState();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const generateAuthWindow = () => {
    setAuthWindow(
      window.open(
        getAuthUrl({
          clientId: CLIENT_ID,
          endpointDomain: ENDPOINT_DOMAIN,
          scope: REDDIT_SCOPE,
          state
        })
      )
    );
  };

  useEffect(() => {
    const searchParams = new URL(window.location.toString()).searchParams;
    /*
        Once the user has selected 'allow' from reddit, the opened window will
        send the code and state back to the original site (dispatches back to the MessageEvent)
    */
    if (window.opener && searchParams.has('code')) {
      window.opener.postMessage(
        { code: searchParams.get('code'), state: searchParams.get('state') },
        window.location.origin
      );
    }

    // The state url param helps us determine which window the user is in
    setUrlState(
      btoa(
        [...window.crypto.getRandomValues(new Uint8Array(32))]
          .map((num) => String.fromCharCode(num))
          .join('')
      )
    );
  }, []);

  const closeAuthWindowOnSuccess = useCallback(
    async (event) => {
      if (
        event.origin === window.location.origin &&
        event.data.state === state
      ) {
        try {
          setLoading(true);
          authWindow.close();
          const {
            savedContent,
            accessToken,
            username
          } = await fetchUserContent(event.data.code);
          setLoading(false);
          dispatch({ type: 'SET_SAVED_CONTENT', payload: savedContent });
          dispatch({ type: 'LOGIN' });
          localStorage.setItem('accessToken', accessToken);
          Router.push('/dashboard/[user]', `/dashboard/${username}`);
        } catch (err) {
          console.log(err);
          return err;
        }
      }
    },
    [state, authWindow]
  );

  useGlobalMessage(closeAuthWindowOnSuccess);

  // ! Code to be used later
  // const unsave = async () => {
  //   console.log('here', accessToken, id);
  //   const foo = await axios.post('/api/unsaveContent', {
  //     accessToken,
  //     id
  //   });
  //   console.log('FOO', foo);
  // <Button click={() => unsave()} text="unsave"></Button>
  // };

  return (
    <div>
      {isLoading ? <h1>isLoading</h1> : <></>}
      <Button click={() => {}} text="Login" bgColor="primary"></Button>
      {/* <Button click={() => generateAuthWindow()} text="Login"></Button> */}
    </div>
  );
};

export default Authenticate;
