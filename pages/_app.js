import "antd/dist/antd.css";
import "./assets/css/global.css";
import "./assets/css/floatLabel.css";
import "antd/es/popover/style/index.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo-icon.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
