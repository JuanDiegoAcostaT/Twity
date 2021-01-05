import { colors } from "../../styles/theme";

export default function Spinner() {
  return (
    <>
      <div className="loadingio-spinner-cube-fthqyncigo5">
        <div className="ldio-rnkqim6s1x">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <style jsx>
        {`
          @keyframes ldio-rnkqim6s1x {
            0% {
              transform: scale(1.1500000000000001);
            }
            100% {
              transform: scale(1);
            }
          }
          .ldio-rnkqim6s1x div {
            position: absolute;
            width: 80px;
            height: 80px;
            top: 13.333333333333336px;
            left: 13.333333333333336px;
            background: ${colors.primary};
            animation: ldio-rnkqim6s1x 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
            animation-delay: -0.3s;
          }
          .ldio-rnkqim6s1x div:nth-child(2) {
            top: 13.333333333333336px;
            left: 106.66666666666666px;
            background: ${colors.secondary};
            animation-delay: -0.2s;
          }
          .ldio-rnkqim6s1x div:nth-child(3) {
            top: 106.66666666666666px;
            left: 13.333333333333336px;
            background: ${colors.secondary};
            animation-delay: 0s;
          }
          .ldio-rnkqim6s1x div:nth-child(4) {
            top: 106.66666666666666px;
            left: 106.66666666666666px;
            background: ${colors.primary};
            animation-delay: -0.1s;
          }
          .loadingio-spinner-cube-fthqyncigo5 {
              margin-left : 20px;
            width: 200px;
            height: 200px;
            display: inline-block;
            overflow: hidden;
          }
          .ldio-rnkqim6s1x {
            width: 100%;
            height: 100%;
            position: relative;
            transform: translateZ(0) scale(1);
            backface-visibility: hidden;
            transform-origin: 0 0; /* see note above */
          }
          .ldio-rnkqim6s1x div {
            box-sizing: content-box;
          }


        `}
      </style>
    </>
  );
}
