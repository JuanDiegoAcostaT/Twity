import { useState, useEffect } from "react";
import Devit from "../../comoponents/Devit/index";
import useUser from "../../hooks/useUser";
import { fetchLatestTweets } from "../../firebase/client";
import Link from "next/link";
import Create from "../../comoponents/Icons/Create";
import Search from "../../comoponents/Icons/Search";
import Home from "../../comoponents/Icons/Home";
import { colors } from "../../styles/theme";
import Head from "next/head";

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    user &&
      // fetch("http://localhost:3000/api/statuses/home_timeline")
      //   .then((res) => res.json())
      //   .then(setTimeline);
      fetchLatestTweets().then(setTimeline);
  }, [user]);

  return (
    <>
      <Head>
        <title>Inicio / Twity</title>
      </Head>
      <div>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map((devit) => {
            return (
              <Devit
                avatar={devit.avatar}
                userName={devit.userName}
                key={devit.id}
                content={devit.content}
                userId={devit.userId}
                createdAt={devit.createdAt}
                img={devit.img}
                id={devit.id}
              />
            );
          })}
        </section>
        <nav>
          <nav>
            <Link href="/home">
              <a>
                <Home width={32} height={32} stroke={colors.primary} />
              </a>
            </Link>
            <Link href="/search">
              <a>
                <Search width={32} height={32} stroke={colors.primary} />
              </a>
            </Link>
            <Link href="/compose/tweet">
              <a>
                <Create width={32} height={32} stroke={colors.primary} />
              </a>
            </Link>
          </nav>
        </nav>
      </div>
      <style jsx>
        {`
          header {
            align-items: center;
            border-bottom: 1px solid #eee;
            display: flex;
            height: 49px;
            position: sticky;
            top: 0;
            width: 100%;
            background: #ffffffaa;
            backdrop-filter: blur(5px);
          }

          section {
            flex: 1;
          }

          h2 {
            font-size: 21px;
            padding-left: 15px;
          }

          article {
            padding: 10px 15px;
          }

          section {
            padding-top: 10px;
          }

          nav {
            border-top: 1px solid #eee;
            bottom: 0;
            height: 49px;
            position: sticky;
            width: 100%;
            background: #fff;
            display: flex;
            flex: 1 1 auto;
            align-items: center;
            justify-content: space-evenly;
          }

          nav a {
            display: flex;
            flex: 1 1 auto;
            align-items: center;
            justify-content: center;
          }

          nav a:hover {
            background: radial-gradient(#cf750022 15%, transparent 16%);
            background-size: 180px 180px;
            background-position: center;
          }

          nav a:hover > :global(svg) {
            stroke: ${colors.primary};
          }
        `}
      </style>
    </>
  );
}
