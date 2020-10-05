// import styled from 'styled-components';
import React, { useEffect, useState, useCallback } from 'react';
import Button from './Button';
import btoa from 'btoa';
import {
  ENDPOINT_DOMAIN,
  CLIENT_ID,
  REDDIT_SCOPE
} from '../constants/constants';
import { useGlobalMessage } from '../hooks/useWindowEvent';
import { AuthURLParams } from '../types/types';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { login } from '../store/actions';
import PostCardLoader from './Loaders/PostCardLoader';
import AccordionLoader from './Loaders/AccordionLoader';

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

export const LandingPage: React.FC = () => {
  const [state, setUrlState] = useState('');
  const [authWindow, setAuthWindow] = useState<any>();
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
          const { username } = await dispatch(login(event.data.code));
          setLoading(false);
          if (username) {
            Router.push('/dashboard/[user]', `/dashboard/${username}`);
          }
        } catch (err) {
          console.log(err);
          return err;
        }
      }
    },
    [state, authWindow]
  );
  useGlobalMessage(closeAuthWindowOnSuccess);

  return (
    <div>
      {/* {isLoading ? <Loader loaderType={'circle'} /> : <></>} */}
      <PostCardLoader />
      <AccordionLoader />
      <Button
        click={() => generateAuthWindow()}
        text="Login"
        bgColor="primary"
      ></Button>
    </div>
  );
};

export default LandingPage;
