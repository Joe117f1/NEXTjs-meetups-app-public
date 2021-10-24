import React, { Fragment } from 'react';
import Head from 'next/head';
import SignInForm from '../../components/ui/SignInForm';

const SignIn: React.FC = () => {
  return (
    <Fragment>
      <Head>
        <title>Meetups sign in</title>
        <meta
          name='description'
          content='Sign in to host new meetups and enjoy all the features'
        />
      </Head>
      <SignInForm />
    </Fragment>
  );
};

export default SignIn;
