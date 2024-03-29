import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
:root {
  --black: #20293C;
  --white: #fff;
  --accent: #FF20DF;
  --extra-color-1: #2FF0DD;
  --extra-color-2: #EEEB78; }

html,
body {
  overflow-y: auto;
  height: 100%; }

body {
  color: var(--white);
  margin: 0;
  font-family: "forma-djr-micro", sans-serif;
  background-color: #20293C;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; }

.textGlow {
  color: var(--extra-color-1);
  text-Shadow: 0px 0px 20px var(--extra-color-1); }
  .textGlow.pink {
    color: var(--accent);
    text-Shadow: 0px 0px 20px var(--accent); }
  .textGlow.MuiSvgIcon-root {
    filter: drop-shadow(0px 0px 5px var(--extra-color-1)); }
  .textGlow.pink.MuiSvgIcon-root {
    filter: drop-shadow(0px 0px 5px var(--accent)); }

.boxGlow {
  box-shadow: 0px 0px 20px 0px var(--extra-color-1); }
  .boxGlow.pink {
    box-shadow: 0px 0px 20px 0px var(--accent); }

.boxed {
  position: relative;
  border: 0 !important;
  box-shadow: none !important;
  overflow: initial !important;
  backdrop-filter: none !important; height: 100%; }
  .boxed:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 34px);
    border: 2px solid var(--extra-color-1);
    border-radius: 20px;
    box-shadow: 0px 0px 5px var(--extra-color-1);
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px); }
  .boxed > * {
    position: relative;
    padding-top: 0 !important;
    height: 100%;
    display: flex;
    flex-direction: column; }
    .boxed > *:last-child {
      padding-bottom: 30px; }
    .boxed > * .buttonWrap {
      margin-top: auto; }
  .boxed.link:before {
    transition: box-shadow 0.2s ease-out; }
  .boxed.link:hover:before {
    box-shadow: 0px 0px 20px 0px var(--extra-color-1); }
  .boxed .info-wrap {
    position: relative; }
    .boxed .info-wrap:before {
      content: '';
      position: absolute;
      width: 2px;
      height: calc(100% - 20px);
      background: var(--extra-color-1);
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      box-shadow: 0px 0px 5px var(--extra-color-1); }

.info-wrap {
  position: relative; }
  .info-wrap:before {
    content: '';
    position: absolute;
    width: 2px;
    height: calc(100% - 20px);
    background: var(--extra-color-1);
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    box-shadow: 0px 0px 5px var(--extra-color-1); }

.section {
  padding: 100px 0; }
  @media (max-width: 767px) {
    .section {
      padding: 40px 0; } }

.icon-pools > * {
  display: inline-block;
  margin-left: -15px; }
  .icon-pools > *:first-child {
    position: relative;
    margin-left: 0; }

.wallet-button {
  margin-bottom: 20px !important; }
  .wallet-button img {
    -webkit-transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1); }
  .wallet-button:hover img {
    filter: drop-shadow(0px 0px 20px #fff); }
  .wallet-button:last-child {
    margin-bottom: 0 !important; }

.kallisto {
  font-family: "kallisto", sans-serif !important; }

.image-bg {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-attachment: fixed;
  z-index: 0; }
  @media (max-width: 767px) {
    .image-bg {
      position: fixed;
      background-attachment: initial; } }

`

export default GlobalStyle
