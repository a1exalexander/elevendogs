import type { AppProps } from 'next/app';
import Head from 'next/head';
import clsx from 'clsx';
import { Saira, Manrope, Unbounded, JetBrains_Mono } from 'next/font/google';
import { seo } from '../data';
import '../styles/styles.scss';

// Saira has no Cyrillic subset — Cyrillic glyphs fall back to Manrope via the
// $FONT_DISPLAY stack (see styles/core/_fonts.scss).
const saira = Saira({
  subsets: ['latin'],
  variable: '--font-saira',
  display: 'swap',
});
const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
});
const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-unbounded',
  display: 'swap',
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
  display: 'swap',
});

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
        <meta name="theme-color" content="#0a0b0d" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="og:image" content="/og.jpg" />
        <meta name="twitter:image" content="/og.jpg" />
      </Head>
      <div
        className={clsx(
          saira.variable,
          manrope.variable,
          unbounded.variable,
          jetBrainsMono.variable
        )}
      >
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
