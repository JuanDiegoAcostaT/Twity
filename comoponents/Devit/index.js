import { colors } from "../../styles/theme";
import useTimeAgo from "../../hooks/useTimeAgo";
import useDateTimeFormat from "../../hooks/useDateTimeFormat";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Devit({
  userName,
  avatar,
  content,
  createdAt,
  img,
  id,
}) {
  const timeAgo = useTimeAgo(createdAt);
  const createdAtFormated = useDateTimeFormat(createdAt);
  const router = useRouter();

  const handleClickArticle = (e) => {
    e.preventDefault();
    router.push("status/[id]", `/status/${id}`);
  };

  return (
    <>
      <article onClick={handleClickArticle}>
        <div className="article">
          <img className="avatar" src={avatar} alt={userName} />
          <div className="article_info">
            <div className="article__head">
              <h5 style={{ margin: 0 }}>{userName}</h5>
              <a>
                <Link href="status/[id]" as={`status/${id}`}>
                  <time title={createdAtFormated}>{timeAgo}</time>
                </Link>
              </a>
            </div>
            <p style={{ margin: 0 }}>{content}</p>
            {img && <img alt={userName} className="imgDevit" src={img} />}
          </div>
        </div>
      </article>
      <style jsx>
        {`
          article {
            border-bottom: 1px solid ${colors.primary};
          }
          .imgDevit {
            width: 100%;
            height: auto;
            border-radius: 10px;
            margin-top: 10px;
          }
          .article {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 10px;
          }

          .article:hover {
            background: lightgray;
            cursor: pointer;
          }

          .avatar {
            width: 50px;
            border-radius: 50%;
            -webkit-box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.3);
            -moz-box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.3);
            box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.3);
          }
          .article_info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 16px;
          }
          .article_msg {
          }
          a {
            color: #555;
            font-size: 14px;
            text-decoration: none;
            padding-left: 10px;
            cursor: pointer;
          }
          a:hover {
            text-decoration: underline;
          }
          .article__head {
            display: flex;
            justify-content: flex-start;
          }
        `}
      </style>
    </>
  );
}
