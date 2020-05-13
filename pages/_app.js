import Head from "next/head";
import Header from "components/Header";
import Footer from "components/Footer";
import GlobalStyles from "components/GlobalStyles";

export default function BoostApp({ pageProps, Component }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Boost | Increase online event engagement</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="var(--primary)" />
        <meta name="twitter:site" content="@getboostapp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="og:title"
          content="Boost | Increase online event engagement"
        />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="og:url" content="https://getboost.app" />
        <meta name="description" content="" />
        <meta name="og:description" content="" />
        <meta name="og:image" content="https://getboost.app/social.png" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <GlobalStyles />
    </>
  );
}
