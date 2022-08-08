import React, { useState, useEffect, useRef, useContext } from "react";
import styled, {keyframes, ThemeContext} from "styled-components";
import throttle from "lodash/throttle";
import Flex from "../../components/Box/Flex";
import { useMatchBreakpoints } from "../../hooks";
import UserBlock from "./components/UserBlock";
import { NavProps } from "./types";
import { MENU_HEIGHT, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "./config";
import {useLocation, Link} from "react-router-dom";
import { Text } from "../../components/Text";
import { MoreIcon } from "./icons";
import { Button } from "../../components/Button";
import { Svg } from "../../components/Svg";

const Wrapper = styled.div`
position: relative;
width: 100%;
z-index: 1;
`;

const StyledNav = styled.nav<{ showMenu: boolean }>`
position: fixed;
top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
left: 0;
width: 100%;
height: ${MENU_HEIGHT}px;
background-color: #212E4D;
z-index: 10;
`;

const BodyWrapper = styled.div`
position: relative;
display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
flex-grow: 1;
margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
transform: translate3d(0, 0, 0);
max-width: 100%;
`;

const StyledLink = styled(Link)`
font-family: "kallisto", sans-serif;
font-weight: 700;
margin: 0 15px;

&.active:not(.about), &:hover {
  color: var(--extra-color-1);
  text-shadow: 0px 0px 20px var(--extra-color-1);
  text-decoration: none;
}
`;

const StyledLogo = styled(Text)`
text-shadow: 0px 0px 10px #fff;
`;

const StyledLinksWrapper = styled.div`

`;

const StyledDropdown = styled.div`
  cursor: pointer;
  display: inline;
  position: relative;

  > a {
    font-family: "kallisto", sans-serif;
    font-weight: 700;
    margin: 0 15px;

    > svg {
      top: -2px;
      display: inline;
      position: relative;
      vertical-align: middle;
      width: 1em;
      height: 1em;
      font-size: 1.71429rem;
      fill: currentcolor;
    }
  }

  &.open, &:hover {
    > a {
      color: var(--extra-color-1);
      text-shadow: 0px 0px 20px var(--extra-color-1);
      text-decoration: none;

      > svg {
        fill: var(--extra-color-1);
      }
    }
  }

  &.open > a > svg {
    transform: rotate(180deg);
  }

  .dropdown {
    top: 100%;
    left: 0;
    display: none;
    z-index: 10;
    position: absolute;
    padding-top: 21px;

    > div {
      color: #fff;
      padding: 16px;
      min-width: 210px;
      background-color: #0A101C;

      > a {
        display: block;
        font-weight: 700;
        margin: 0;
        margin-bottom: 16px;
        text-decoration: none;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  &.open {
    .dropdown {
      display: block;
    }
  }

`;

const StyledNavInner = styled.div`
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;

  @media (min-width: 1200px) {
    max-width: 1200px;
    margin: 0 auto;
  }

  @media (max-width: 767px) {
    .gamePrice {
      text-align: center;
    }
  }
`;

const StyledButton = styled(Button)`
  padding: 10px 0;
  height: 44px;
  min-width: 64px;

  svg {
    height: 18px;
    width: auto;
  }
`;

const StyledMobileMenu = styled.div`
  position: fixed;
  inset: 0px;
  z-index: 1200;
  visibility: hidden;
  opacity: 0;

  &.open {
    visibility: visible;
    opacity: 1;

    .mobileMenuBackdrop {
      visibility: visible;
      opacity: 1;
    }

    .mobileMenuWrapper {
      transform: translateX(0);
    }
  }

  &.close {
    visibility: visible;
    opacity: 1;

    .mobileMenuBackdrop {
      opacity: 0;
    }

    .mobileMenuWrapper {
      transform: translateX(-100%);
    }
  }
`

const StyledMobileBackdrop = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  inset: 0px;
  background-color: rgba(10, 16, 28, 0.8);
  backdrop-filter: blur(5px);
  z-index: -1;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
;`

const StyledMobileWrapper = styled.div`
  background-color: #0A142A;
  color: rgb(255, 255, 255);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 240px;
  flex: 1 0 auto;
  z-index: 1200;
  position: fixed;
  top: 0px;
  left: 0px;
  transform: translateX(-100%);
  transition: transform 0.2s ease-in-out;
`;

const StyledMobileMenuClose = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;

  svg {
    fill: currentColor;
    cursor: pointer;
    font-size: 35px;
    width: 1em;
    height: 1em;
    filter: drop-shadow(0 0 5px var(--accent));
  }
`;

const StyledMobileMenuList = styled.ul`
list-style: none;
margin: 0px;
padding: 8px 0px;
position: relative;
border-radius: 20px;
background-color: rgb(10, 20, 42);

a {
  display: block;
  padding: 16px 16px;
  color: inherit;
  font-family: kallisto, sans-serif;
  font-size: 18px;
  
  &:hover, &.active {
    background-color: rgba(0, 0, 0, 0.04);
    color: var(--extra-color-1);
    text-shadow: 0px 0px 20px var(--extra-color-1);
  }
}
`;

const StyledMobileLink = styled(Link)``;

const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  cakePriceUsd,
  links,
  profile,
  children,
}) => {
  const { isSm } = useMatchBreakpoints();
  const isMobile = isSm === false;
  const [open, setOpen] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(window.pageYOffset);
  const location = useLocation();
  const theme = useContext(ThemeContext);

  const handleDrawerOpen = () => {
    setOpen(true);

    document.body.style.overflow = 'hidden';
  };

  const handleDrawerClose = () => {
    document.body.style.overflow = '';
    
    setIsClose(true);
    setTimeout(() => {
      setIsClose(false);
      setOpen(false);
    }, 200);
  };

  // create dropdown hover effect
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };

  }, []);

  useEffect(() => {
    // handle mobile menu click event
    const mobileMenuElement = document.querySelectorAll('.mobileMenuWrapper a');
    mobileMenuElement.forEach(element => {
      element.addEventListener('click', () => {
        handleDrawerClose();
      })
    });
  }, []);

  return (
      <>
    <Wrapper>
      <StyledNav showMenu={showMenu}>
        <StyledNavInner>
          {!isMobile && (
            <StyledButton onClick={handleDrawerOpen}>
              <Svg viewBox="0 0 27 19">
                <g id="Group_139" data-name="Group 139" transform="translate(-12.5 5697)">
                  <path id="Line_1" data-name="Line 1" d="M24,1.5H0A1.5,1.5,0,0,1-1.5,0,1.5,1.5,0,0,1,0-1.5H24A1.5,1.5,0,0,1,25.5,0,1.5,1.5,0,0,1,24,1.5Z" transform="translate(14 -5695.5)" fill="currentColor"/>
                  <path id="Line_2" data-name="Line 2" d="M24,1.5H0A1.5,1.5,0,0,1-1.5,0,1.5,1.5,0,0,1,0-1.5H24A1.5,1.5,0,0,1,25.5,0,1.5,1.5,0,0,1,24,1.5Z" transform="translate(14 -5679.5)" fill="currentColor"/>
                  <path id="Line_3" data-name="Line 3" d="M24,1.5H0A1.5,1.5,0,0,1-1.5,0,1.5,1.5,0,0,1,0-1.5H24A1.5,1.5,0,0,1,25.5,0,1.5,1.5,0,0,1,24,1.5Z" transform="translate(14 -5687.5)" fill="currentColor"/>
                </g>
              </Svg>
            </StyledButton>
          )}
          <div>
            <Link to="/">
              <StyledLogo heading={true} fontSize="20px" textTransform="uppercase">
                Game Theory
              </StyledLogo>
            </Link>
            {cakePriceUsd && (
              <Text fontSize="12px" color="#fff" className="gamePrice" style={{textShadow: '0px 0px 10px #fff'}}>
                <span className="textGlow">GAME Price:</span> ${cakePriceUsd || '0.00'}
              </Text>
            )}
          </div>
        {isMobile && (
        <StyledLinksWrapper>
          <StyledLink to='/play' aria-label="Play page" className={location.pathname === '/play' ? 'active' : '' || location.pathname === '/altergene' ? 'active' : ''}>
            Play
          </StyledLink>
          <StyledLink to='/swap' aria-label="Swap page" className={location.pathname === '/swap' || location.pathname === '/pool' || location.pathname === '/add' ? 'active' : '' || location.pathname === '/find' ? 'active' : ''}>
            Swap
          </StyledLink>
          <StyledLink to='/farms' aria-label="Earn page" className={location.pathname === '/farms' ? 'active' : '' || location.pathname === '/bonds' ? 'active' : '' || location.pathname === '/redeem' ? 'active' : '' || location.pathname === '/rewards' ? 'active' : ''}>
            Earn
          </StyledLink>
          <StyledDropdown onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{display: "inline"}} className={`${isOpen ? 'open' : ''}`}>
            <a>
              More
              <MoreIcon />
            </a>
            <div className="dropdown">
              <div>
                <StyledLink as="a" href="https://docs.gametheory.tech" target="_blank">
                  Documentation
                </StyledLink>
                <StyledLink as="a" href="https://dexscreener.com/avalanche/0x0129d2b26a576916cd588da437f27e315c086b0a" target="_blank">
                  GAME Chart
                </StyledLink>
                <StyledLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                  About Game Theory
                </StyledLink>
                {/*<StyledLink to="/about#community">*/}
                {/*  Community*/}
                {/*</StyledLink>*/}
                <StyledLink as="a" href="https://snowtrace.io/address/0x148988f296b5B8B8e619434546A4C674397777dd" target="_blank">
                  Treasury Wallet
                </StyledLink>
              </div>
            </div>
          </StyledDropdown>
        </StyledLinksWrapper>
        )}
        {!!login && !!logout && (
          <Flex>
            <UserBlock account={account} login={login} logout={logout} />
          </Flex>
        )}
        </StyledNavInner>
      </StyledNav>

        {!isMobile && (
          <StyledMobileMenu className={`${open ? 'open' : ''} ${isClose ? 'close' : ''}`}>
            <StyledMobileBackdrop className="mobileMenuBackdrop" onClick={handleDrawerClose} />
            <StyledMobileWrapper className="mobileMenuWrapper">
              <StyledMobileMenuClose onClick={handleDrawerClose}>
                <Svg viewBox="0 0 24 24" className="textGlow pink">
                  <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </Svg>
              </StyledMobileMenuClose>
              <StyledMobileMenuList>
                <li>
                  <StyledMobileLink to="/">
                    Home
                  </StyledMobileLink>
                </li>
                <li>
                  <StyledMobileLink to='/play' aria-label="Play page" className={location.pathname === '/play' ? 'active' : '' || location.pathname === '/altergene' ? 'active' : ''}>
                    Play
                  </StyledMobileLink>
                </li>
                <li>
                  <StyledMobileLink to='/swap' aria-label="Swap page" className={location.pathname === '/swap' || location.pathname === '/pool' || location.pathname === '/add' ? 'active' : '' || location.pathname === '/find' ? 'active' : ''}>
                    Swap
                  </StyledMobileLink>
                </li>
                <li>
                  <StyledMobileLink to='/farms' aria-label="Earn page" className={location.pathname === '/farms' ? 'active' : '' || location.pathname === '/bonds' ? 'active' : '' || location.pathname === '/redeem' ? 'active' : '' || location.pathname === '/rewards' ? 'active' : ''}>
                    Earn
                  </StyledMobileLink>
                </li>
                <li>
                <StyledMobileLink as="a" href="https://docs.gametheory.tech" target="_blank">
                  Documentation
                </StyledMobileLink>
                </li>
                <li>
                <StyledMobileLink as="a" href="https://dexscreener.com/avalanche/0x0129d2b26a576916cd588da437f27e315c086b0a" target="_blank">
                  GAME Chart
                </StyledMobileLink>
                </li>
                <li>
                <StyledMobileLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                  About Game Theory
                </StyledMobileLink>
                </li>
                <li>
                {/*<StyledMobileLink to="/about#community">*/}
                {/*  Community*/}
                {/*</StyledMobileLink>*/}
                </li>
                <li>
                <StyledMobileLink as="a" href="https://snowtrace.io/address/0x148988f296b5B8B8e619434546A4C674397777dd" target="_blank">
                  Treasury Wallet
                </StyledMobileLink>
                </li>
              </StyledMobileMenuList>
            </StyledMobileWrapper>
          </StyledMobileMenu>
        )}

      <BodyWrapper>
        <Inner isPushed={true} showMenu={showMenu}>
          {children}
        </Inner>
      </BodyWrapper>
    </Wrapper>
      </>
  );
};

export default Menu;
