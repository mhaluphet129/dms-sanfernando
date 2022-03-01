import Head from "next/head";
import dbConnect from "../database/dbConnect";
import User from "../database/model/User";

export default function Home() {
  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  return { props: {} };
}
