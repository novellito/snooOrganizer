import * as React from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserContent } from '../../src/store/actions';

export const withAuth = (C: React.FC) => {
  const Wrapper = (props: any) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(({ login }: any) => login.isLoggedIn);

    useEffect(() => {
      const fetchContent = async () => {
        const userContent = await dispatch(fetchUserContent());
        if (userContent instanceof Error) {
          localStorage.removeItem('accessToken');
          Router.push('/');
        }
      };
      fetchContent();
    }, []);

    return <>{isLoggedIn && <C {...props} />}</>;
  };
  return Wrapper;
};
