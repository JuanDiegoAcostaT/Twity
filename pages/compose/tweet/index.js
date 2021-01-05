import Button from "../../../comoponents/Button/index";
import useUser from "../../../hooks/useUser.js";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { addDevit, uploadImage } from "../../../firebase/client";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCES: 2,
  ERROR: -1,
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

export default function ComposeTweet() {
  const router = useRouter();
  const user = useUser();

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    if (task) {
      let onProgress = () => {};
      let onError = () => {};
      let onComplete = () => {
        console.log("completed");
        task.snapshot.ref.getDownloadURL().then(setImgUrl);
      };
      task.on("state_changed", onError, onProgress, onComplete);
    }
  }, [task]);

  const handelChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.userName,
      img: imgUrl,
    })
      .then(() => {
        router.push("/home");
      })
      .catch((err) => {
        console.log(err);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = e.dataTransfer.files[0];
    const task = uploadImage(file);
    setTask(task);
  };

  const isButtonDisabled = !message.length || status == COMPOSE_STATES.LOADING;

  return (
    <>
      <Head>
        <title>Crear Twit / Twity</title>
      </Head>
      <div className="twit">
        {user && (
          <section className="avatar-container">
            <img src={user.avatar} alt={user.userName} />
          </section>
        )}
        <form action="" onSubmit={handleSubmit}>
          <textarea
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onChange={handelChange}
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Que quieres compartir hoy?"
          ></textarea>
          {imgUrl && (
            <section>
              <button onClick={() => setImgUrl(null)}>x</button>
              <img src={imgUrl} />
            </section>
          )}
          <div className="">
            <Button disabled={isButtonDisabled}>Tweet</Button>
          </div>
        </form>
      </div>
      <style jsx>{`
        .twit {
          display: flex;
        }
        div {
          padding: 15px;
        }

        form {
          padding: 10px;
        }

        section {
          position: relative;
        }
        button {
          position: absolute;
          right: 15px;
          border: 0;
          top: 15px;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          background: black;
          font-size: 24px;
          color: white;
        }

        button:hover {
          cursor: pointer;
        }

        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }

        .avatar-container img {
          width: 50px;
          -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
          -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
          box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
          border-radius: 50%;
          margin-bottom: 8px;
        }

        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }
        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "3px dashed #f0a500"
            : "3px solid transparent"};
          border-radius: 10px;
          outline: 0;
          width: 100%;
          padding: 15px;
          resize: none;
          font-size: 21px;
          min-height: 200px;
        }
      `}</style>
    </>
  );
}
