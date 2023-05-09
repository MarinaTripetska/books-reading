import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import Abril from './assets/fonts/AbrilFatface-Regular.ttf';
import MontserratL from './assets/fonts/Montserrat-Light.ttf';
import MontserratM from './assets/fonts/Montserrat-Medium.ttf';
import MontserratSB from './assets/fonts/Montserrat-SemiBold.ttf';

const GlobalStyle = createGlobalStyle`
${normalize}

@font-face {
    font-family: 'Abril Fatface';
    src: url(${Abril}) format('truetype');
    font-weight: 400;
}

@font-face {
    font-family: 'Montserrat';
    src: url(${MontserratL}) format('truetype');
    font-weight: 400;
}

@font-face {
    font-family: 'Montserrat';
    src: url(${MontserratM}) format('truetype');
    font-weight: 500;
}

@font-face {
    font-family: 'Montserrat';
    src: url(${MontserratSB}) format('truetype');
    font-weight: 600;
}

:root {
  --primary-text-color: #242a37;
  --secondary-text-color: #898f9f;
  --accent-color: #ff6b08;
  --bg-color-blue: #f6f7fb;
  --bg-color-input: #f5f7fa;
  --txt-color-white: #fff;
  --overlay-color: rgba(9, 30, 63, 0.2);
  --light-grey: #b1b5c2;
  --dark-grey: #6d7a8d;
  --icon-color: #a6abb9;
  --table-line: #e0e5eb;
  --count-num: #091e3f;

  --hover-color: #d15807;
  --hover-btn-lib: #47566f;

  --outer-shadow: 0px 2px 3px rgba(9, 30, 63, 0.1);
  --inner-shadow: inset 0px 1px 2px rgba(29, 29, 27, 0.15);
  --active-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

  --cubic: 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

#root {
  min-height: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  margin: 0;
  font-family: 'Montserrat';
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body,
h1,
h2,
h3,
p,
ul,
li
 {
  margin: 0;
}


ul{
  list-style: none;
    padding: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

`;

export default GlobalStyle;
