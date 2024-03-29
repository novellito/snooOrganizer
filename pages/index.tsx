import Head from 'next/head';
import LandingPage from '../src/components/LandingPage';
import React from 'react';

export const Index = () => {
  return (
    <>
      <Head>
        <title>Organize Reddit saved posts & comments</title>
        <meta name="description" content="a nextjs starter boilerplate" />
      </Head>
      <LandingPage />
    </>
  );
};

export default Index;
