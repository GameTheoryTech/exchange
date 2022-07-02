import React, {useContext} from "react";
import styled, {keyframes, ThemeContext} from "styled-components";
import { Link } from "react-router-dom";
import { LogoIcon } from "../../../components/Svg";
import Flex from "../../../components/Box/Flex";
import { HamburgerIcon, HamburgerCloseIcon, LogoIcon as LogoWithText } from "../icons";
import MenuButton from "./MenuButton";
import {Box} from "../../../components/Box";

interface Props {
  isPushed: boolean;
  isDark: boolean;
  togglePush: () => void;
  href: string;
}

const blink = keyframes`
  0%,  100% { transform: scaleY(1); } 
  50% { transform:  scaleY(0.1); } 
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  .mobile-icon {
    width: 32px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: none;
    }
  }
  .desktop-icon {
    width: 212px;
    margin-left: 16px;
    height: 28px;
    display: none;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: block;
    }
  }
  .right-eye {
    animation-delay: 20ms;
  }
  &:hover {
    .left-eye,
    .right-eye {
      transform-origin: center 60%;
      animation-name: ${blink};
      animation-duration: 350ms;
      animation-iteration-count: 1;
    }
  }
`;

const Logo: React.FC<Props> = ({ isPushed, togglePush, isDark, href }) => {
  const isAbsoluteUrl = true;//href.startsWith("http");
  const innerLogo = (
    <>
      {/*<LogoIcon className="mobile-icon" />*/}
      {/*<LogoWithText className="desktop-icon" isDark={isDark} />*/}
    </>
  );
  const theme = useContext(ThemeContext);
  return (
    <Flex flexDirection="row" justifyContent="space-between" mx="10px">
      <Box mx="8px">
      {isAbsoluteUrl ? (
        // @ts-ignore
        <StyledLink style={{color: theme.colors.text}} as="a" href={href} aria-label="Home page">
          Home
        </StyledLink>
      ) : (
        <StyledLink style={{color: theme.colors.text}} to={href} aria-label="Home page">
          Home
        </StyledLink>
      )}
      </Box>
      <Box mx="8px">
      <StyledLink style={{color: theme.colors.text}} as="a" href="https://gametheory.link/WbTw" aria-label="Home page">
        Twitter
      </StyledLink>
      </Box>
      <Box mx="8px">
      <StyledLink style={{color: theme.colors.text}} as="a" href="https://gametheory.link/WbDc" aria-label="Home page">
        Discord
      </StyledLink>
      </Box>
      <Box mx="8px">
      <StyledLink style={{color: theme.colors.text}} as="a" href="https://gametheory.link/WbYt" aria-label="Home page">
        YouTube
      </StyledLink>
      </Box>
      <Box mx="8px">
      <StyledLink style={{color: theme.colors.text}} as="a" href="https://gametheory.link/WbMd" aria-label="Home page">
        Medium
      </StyledLink>
      </Box>
      <Box mx="8px">
      <StyledLink style={{color: theme.colors.text}} as="a" href="https://gametheory.link/WbGb" aria-label="Home page">
          Docs
      </StyledLink>
      </Box>
      <Box mx="8px">
      <StyledLink style={{color: theme.colors.text}} as="a" href="https://old.gametheory.tech" aria-label="Home page">
        Old Site
      </StyledLink>
      </Box>
    </Flex>
  );
};

export default React.memo(Logo, (prev, next) => prev.isPushed === next.isPushed && prev.isDark === next.isDark);
