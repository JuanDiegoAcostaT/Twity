export default function Avatar({ alt, src, userName, email }) {
  return (
    <>
      <div className="avatar">
        <img src={src} alt={alt} />
        <strong>{userName}</strong>
        <strong>{email}</strong>
      </div>
      <style jsx>
        {`
          .avatar {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top : 16px;
          }

          .avatar img {
            width: 80px;
            -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
            border-radius: 50%;
            margin-bottom: 8px;
        `}
      </style>
    </>
  );
}
