import css from 'styled-jsx/css'

import { fonts, colors, breakpoints } from '../../styles/theme'
import { addOpacityToColor } from '../../styles/utils'

const backgroundColor = addOpacityToColor(colors.primary, 0.3)

export const globalStyles = css.global`
  html,
  body {
    background-image: radial-gradient(${backgroundColor} 1px, transparent 1px),
      radial-gradient(${backgroundColor} 1px, transparent 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
    font-family: ${fonts.base};
  }
  * {
    box-sizing: border-box;
  }

  textarea input {
    font-family : ${fonts.base}
  }

`

export default css`
  div {
    display: grid;
    place-items: center;
    height: 100vh;
  }

  main {
    background-color: ${colors.white};
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.3);
    height: 100%;
    display : flex;
    flex-direction : column;
    overflow-y : auto;
    width: 100%;
    position : relative;
  }

  @media (min-width: ${breakpoints.mobile}) {
    main {
      width: ${breakpoints.mobile};
      height: 90vh;
    }
  }
`
