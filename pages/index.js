import { colors } from "../styles/theme";
import { loginWithGitHub } from "../firebase/client";
import { useEffect } from "react";
import Avatar from "../comoponents/Avatar/index";
import Button from "../comoponents/Button/index";
import GitHub from "../comoponents/Icons/Github.js";
import Spinner from "../comoponents/Spinner/index";
import Head from "next/head";
import { useRouter } from "next/router";
import useUser, { USER_STATES } from "../hooks/useUser";

export default function Home() {
  const router = useRouter();

  const user = useUser();

  useEffect(() => {
    user && router.replace("/home");
  }, [user]);

  const handleClick = () => {
    loginWithGitHub()
      .then((user) => {
        // const { avatar, username, url } = user;
        setUser(user);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>Twity</title>
        <link rel="icon" href="/Untitled-1.png" />
      </Head>

      <section>
        <img src="/Untitled-1.png" width="100px" alt="logo" />
        <h1>Twity</h1>
        <h2>Developers Social Media</h2>

        <div className="">
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              Login with GitHub <GitHub fill="white" />{" "}
            </Button>
          )}
          {user && user.avatar && (
            <Avatar
              src={user.avatar}
              alt={user.username}
              userName={user.username}
              email={user.email}
            />
          )}
          {user == undefined && <Spinner />}
        </div>
      </section>

      <style jsx>
        {`
          div {
            margin-top: 16px;
          }
          h1 {
            color: ${colors.primary};
            font-size: 24px;
            font-weight: 800px;
            margin-bottom: 16px;
          }
          h2 {
            margin: 0;
            font-size: 16px;
            color: ${colors.secondary};
          }

          section {
            display: grid;
            height: 100%;
            place-content: center;
            place-items: center;
          }
        `}
      </style>
    </>
  );
}
