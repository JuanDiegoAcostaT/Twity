import Devit from "../../comoponents/Devit/index.js";

export default function TwitPage(props) {
  return (
    <>
      <Devit {...props} />

      <style jsx>{``}</style>
    </>
  );
}

TwitPage.getInitialProps = (ctx) => {
  const { query } = ctx;
  const { id } = query;
  return fetch(`http://localhost:3000/api/twits/${id}`).then((apiResponse) => {
    if (apiResponse.ok) return apiResponse.json();
  });
};
