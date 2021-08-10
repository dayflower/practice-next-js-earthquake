import Head from 'next/head';
import QuakeEventList from '../components/QuakeEventList';

export const Home = (): JSX.Element => {
  return (
    <div className="ui container">
      <div>
        <Head>
          <title>Recent Earthquakes</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="ui header">最近の地震情報</h1>

          <QuakeEventList />
        </main>

        <footer></footer>

        <style jsx global>{`
          body {
            margin: 4rem;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Home;
