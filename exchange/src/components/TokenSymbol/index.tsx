import React from 'react';
import styled from 'styled-components';

//Graveyard ecosystem logos
const gameLogo = '/images/GAME.png';
const theoryLogo = '/images/THEORY.png';
const masterLogo = '/images/MASTER.png';
const usdcLogo = '/images/USDC.png';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  GAME: gameLogo,
  THEORY: theoryLogo,
  MASTER: masterLogo,
  USDC: usdcLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 64 }) => {
  if (!logosBySymbol[symbol]) {
    return <img src={logosBySymbol['GAME']} alt={`${symbol} Logo`} width={size} height={size} style={{borderRadius: '100%',boxShadow: "0px 0px 20px 0px var(--extra-color-1)",}} />
    // throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} style={{borderRadius: '100%', boxShadow: "0px 0px 20px 0px var(--extra-color-1)",}} />;
};

export const TokenSymbolWrapper = styled.div`
> * {
  display: inline-block;
  margin-left: -15px;

  &:first-child {
    position: relative;
    margin-left: 0;
  }
}
margin-bottom: 20px;
`;

export default TokenSymbol;
