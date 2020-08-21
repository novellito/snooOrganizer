import * as React from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const withAuth = (C: React.FC) => {
  const Wrapper = (props: any) => {
    const isLoggedIn = useSelector(({ login }: any) => login.isLoggedIn);
    useEffect(() => {
      if (!isLoggedIn) {
        Router.push('/');
      }
    });

    return <>{isLoggedIn && <C {...props} />}</>;
  };
  return Wrapper;
};
