import React, { useContext, useEffect, useState } from 'react'
import { Menu as UikitMenu } from '@gametheory/uikit'
import { useWeb3React } from '@web3-react/core'
import { allLanguages } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useGetLocalProfile from 'hooks/useGetLocalProfile'
import useAuth from 'hooks/useAuth'
import useGetCakeBusdLpPrice from 'utils/useGetCakeBusdLpPrice'
import links from './config'
import styled from 'styled-components'
import {GAME, ROUTER_ADDRESS} from "../../constants";
import {useContract, useGameContract, useTokenContract} from "../../hooks/useContract";
import {BigNumber, BigNumberish, ethers} from "ethers";
import GAME_ABI from '../../constants/abis/game.json'

const StyledImageBackground = styled.div`
background-image: url('/images/background.jpg');
background-size: cover;
background-repeat: no-repeat;
background-position: 50%;
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-attachment: fixed;
z-index: 0;

@media (max-width: 767px) {
  position: fixed;
  background-attachment: scroll;
}
`;

const Menu: React.FC = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const cakeBusdPrice = useGetCakeBusdLpPrice()
  const profile = useGetLocalProfile()
  const game = useContract(GAME?.address, GAME_ABI);
  const [oraclePrice, setOraclePrice] = useState(BigNumber.from(0));

  const formatEther2 = (ether : BigNumberish) : string => {
    const balance = BigNumber.from(ether);
    const remainder = balance.mod(BigNumber.from(10).pow(16));
    return (ethers.utils.formatEther(balance.sub(remainder)));
  }

  useEffect(() => {
    const effect = async () =>
    {
      const price = await game?.getPrice();
      setOraclePrice(price)
    }
    effect();
  }, [game]);

  const gamePrice = formatEther2(oraclePrice ?? BigNumber.from(0));

  // convert gamePrice to number
  const gamePriceNumber = parseFloat(gamePrice);

  return (
    <>
    <UikitMenu
      links={links}
      account={account as string}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage?.code || ''}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={gamePriceNumber}
      profile={profile}
      {...props}
    />
    <StyledImageBackground />
    </>
  )
}

export default Menu
