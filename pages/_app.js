import Header from "components/Header";
import Footer from "components/Footer";
import GlobalStyles from "components/GlobalStyles";

export default function BoostApp({ pageProps, Component }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <GlobalStyles />
    </>
  );
}
