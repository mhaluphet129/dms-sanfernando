import "antd/dist/antd.css";
import "./assets/css/global.css";
import "./assets/css/floatLabel.css";
import "antd/es/popover/style/index.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <html lang='en'>
      <Head>
        <link rel='shortcut icon' href='/logo-icon.svg' />
        <title>AgriSUPPORT</title>
        <meta
          name='description'
          content='This system develop to help MAGRO manage farmers, farmworkers and fisherfolk data and information to be manage.'
        ></meta>
      </Head>
      <Component {...pageProps} />
    </html>
  );
}

export default MyApp;
