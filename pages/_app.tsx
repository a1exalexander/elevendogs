import type { AppProps } from 'next/app';
import Head from 'next/head';
import { seo, locations } from '../data';
import '../styles/styles.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="og:title" content={seo.title} />
        <meta name="og:description" content={seo.description} />
        <meta name="og:type" content="website" />
        <meta name="theme-color" content="#1a1a1a" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
