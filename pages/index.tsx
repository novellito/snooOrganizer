import Head from 'next/head';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Button from '../src/components/Button';
import btoa from 'btoa';
import { useState, useEffect } from 'react';
const Hello = styled.h1`
  color: teal;
  font-size: 50px;
`;

function getAuthUrl({
  clientId,
  scope,
  redirectUri,
  permanent,
  state,
  endpointDomain
}: any) {
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

export const Index = () => {
  const [state, setState] = useState();
  // const [authWindow, setWindow] = useState<any>({ close: () => {} });

  const generateTokens = () => {
    // function generateTokens() {
    const endpointDomain = 'reddit.com';
    const clientId = 'Kit8DCMzQX8K1Q';
    // const scope = ['account', 'read'];
    const scope = ['identity', 'read'];
    // const redirectUri = 'http://localhost:3000';
    const permanent = false;
    // const permanent = true;

    const redirectUri = window.location.origin + window.location.pathname;
    const authUrl = getAuthUrl({
      clientId,
      scope,
      redirectUri,
      permanent,
      state,
      endpointDomain
    });
    const authWindow: any = window.open(authUrl);
    // console.log('AUTHURL', authUrl);

    const messageListener = (event: any) => {
      console.log('event', event);
      // console.log(eve);
      console.log('event.data.state', event.data.state);
      console.log('state', state);

      if (
        event.origin !== window.location.origin ||
        event.data.state !== state
      ) {
        return;
      }
      window.removeEventListener('message', messageListener);
      authWindow.close();

      // snoowrap.fromAuthCode({ code: event.data.code, clientId, clientSecret, redirectUri }).then(userSnoowrap => {
      //   this.setState({ userSnoowrap, displayedAccessToken: userSnoowrap.accessToken });
      // });
    };

    window.addEventListener('message', messageListener);
    // setWindow(window.open(authUrl));
  };

  useEffect(() => {
    const searchParams = new URL(window.location.toString()).searchParams;
    if (window.opener && searchParams.has('code')) {
      window.opener.postMessage(
        { code: searchParams.get('code'), state: searchParams.get('state') },
        window.location.origin
      );
    }
    setState(
      btoa(
        [...window.crypto.getRandomValues(new Uint8Array(32))]
          .map(num => String.fromCharCode(num))
          .join('')
      )
    );

    // effect
    return () => {
      // cleanup
    };
    // });
  }, []);
  // useEffect(() => {
  //   console.log('BOOM');

  // }, [authWindow]);

  return (
    <>
      <Head>
        <title>Next.js boilerplate</title>
        <meta name="description" content="a nextjs starter boilerplate" />
      </Head>
      <Hello>Hello World!</Hello>
      <Button click={() => generateTokens()} text="Login"></Button>
      <Link href="/counter">
        <button>
          <FontAwesomeIcon icon={faThumbsUp} /> Go to counter
        </button>
      </Link>
    </>
  );
};

export default Index;
