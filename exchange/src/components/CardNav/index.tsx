import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@gametheory/uikit'
import useI18n from 'hooks/useI18n'

const StyledNav = styled.div`
  margin-bottom: 40px;
`

function Nav({ activeIndex = 0 }: { activeIndex?: number }) {
  const TranslateString = useI18n()
  return (
    <StyledNav>
      <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
        <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
          {TranslateString(1142, 'Swap')}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
          {TranslateString(262, 'Liquidity')}
        </ButtonMenuItem>
        <ButtonMenuItem id="farms-nav-link" to="/farms" as={Link}>
            Earn
        </ButtonMenuItem>
        <ButtonMenuItem id="redeem-nav-link" to="/redeem" as={Link}>
            Redeem
        </ButtonMenuItem>
        <ButtonMenuItem id="redeem-nav-link" to="/bonds" as={Link}>
            Bonds
        </ButtonMenuItem>
        <ButtonMenuItem id="redeem-nav-link" to="/altergene" as={Link}>
          Altergene
        </ButtonMenuItem>
        <ButtonMenuItem id="redeem-nav-link" to="/alterClaim" as={Link} style={{visibility: "hidden", display:"none"}}>
            Altergene Claim
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  )
}

export function SwapNav({ activeIndex = 0 }: { activeIndex?: number }) {
  const TranslateString = useI18n()

  return (
    <StyledNav>
      <ButtonMenu activeIndex={activeIndex} scale="sm">
        <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
          {TranslateString(1142, 'Swap')}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
          {TranslateString(262, 'Liquidity')}
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  )
}

export function EarnNav({ activeIndex = 0 }: { activeIndex?: number }) {

  return (
    <StyledNav>
      <ButtonMenu activeIndex={activeIndex} scale="sm">
        <ButtonMenuItem id="farms-nav-link" to="/farms" as={Link}>
          Pools
        </ButtonMenuItem>
        <ButtonMenuItem id="bonds-nav-link" to="/rewards" as={Link}>
          Rewards
        </ButtonMenuItem>
        <ButtonMenuItem id="bonds-nav-link" to="/bonds" as={Link}>
          Bonds
  </ButtonMenuItem>
        <ButtonMenuItem id="redeem-nav-link" to="/redeem" as={Link}>
          Redeem
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  )
}

export default Nav
