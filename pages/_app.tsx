import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthContextProvider } from '../store/auth-context';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthContextProvider>
      <Layout>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
};

export default MyApp;
