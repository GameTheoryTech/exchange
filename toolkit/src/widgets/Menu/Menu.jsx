"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var throttle_1 = require("lodash/throttle");
var Flex_1 = require("../../components/Box/Flex");
var hooks_1 = require("../../hooks");
var UserBlock_1 = require("./components/UserBlock");
var config_1 = require("./config");
var react_router_dom_1 = require("react-router-dom");
var Text_1 = require("../../components/Text");
var icons_1 = require("./icons");
var Button_1 = require("../../components/Button");
var Svg_1 = require("../../components/Svg");
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nposition: relative;\nwidth: 100%;\nz-index: 1;\n"], ["\nposition: relative;\nwidth: 100%;\nz-index: 1;\n"])));
var StyledNav = styled_components_1.default.nav(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nposition: fixed;\ntop: ", ";\nleft: 0;\nwidth: 100%;\nheight: ", "px;\nbackground-color: #212E4D;\nz-index: 10;\n"], ["\nposition: fixed;\ntop: ", ";\nleft: 0;\nwidth: 100%;\nheight: ", "px;\nbackground-color: #212E4D;\nz-index: 10;\n"])), function (_a) {
    var showMenu = _a.showMenu;
    return (showMenu ? 0 : "-" + config_1.MENU_HEIGHT + "px");
}, config_1.MENU_HEIGHT);
var BodyWrapper = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\nposition: relative;\ndisplay: flex;\n"], ["\nposition: relative;\ndisplay: flex;\n"])));
var Inner = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\nflex-grow: 1;\nmargin-top: ", ";\ntransition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);\ntransform: translate3d(0, 0, 0);\nmax-width: 100%;\n"], ["\nflex-grow: 1;\nmargin-top: ", ";\ntransition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);\ntransform: translate3d(0, 0, 0);\nmax-width: 100%;\n"])), function (_a) {
    var showMenu = _a.showMenu;
    return (showMenu ? config_1.MENU_HEIGHT + "px" : 0);
});
var StyledLink = styled_components_1.default(react_router_dom_1.Link)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\nfont-family: \"kallisto\", sans-serif;\nfont-weight: 700;\nmargin: 0 15px;\n\n&.active:not(.about), &:hover {\n  color: var(--extra-color-1);\n  text-shadow: 0px 0px 20px var(--extra-color-1);\n  text-decoration: none;\n}\n"], ["\nfont-family: \"kallisto\", sans-serif;\nfont-weight: 700;\nmargin: 0 15px;\n\n&.active:not(.about), &:hover {\n  color: var(--extra-color-1);\n  text-shadow: 0px 0px 20px var(--extra-color-1);\n  text-decoration: none;\n}\n"])));
var StyledLogo = styled_components_1.default(Text_1.Text)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\ntext-shadow: 0px 0px 10px #fff;\n"], ["\ntext-shadow: 0px 0px 10px #fff;\n"])));
var StyledLinksWrapper = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n\n"], ["\n\n"])));
var StyledDropdown = styled_components_1.default.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  cursor: pointer;\n  display: inline;\n  position: relative;\n\n  > a {\n    font-family: \"kallisto\", sans-serif;\n    font-weight: 700;\n    margin: 0 15px;\n\n    > svg {\n      top: -2px;\n      display: inline;\n      position: relative;\n      vertical-align: middle;\n      width: 1em;\n      height: 1em;\n      font-size: 1.71429rem;\n      fill: currentcolor;\n    }\n  }\n\n  &.open, &:hover {\n    > a {\n      color: var(--extra-color-1);\n      text-shadow: 0px 0px 20px var(--extra-color-1);\n      text-decoration: none;\n\n      > svg {\n        fill: var(--extra-color-1);\n      }\n    }\n  }\n\n  &.open > a > svg {\n    transform: rotate(180deg);\n  }\n\n  .dropdown {\n    top: 100%;\n    left: 0;\n    display: none;\n    z-index: 10;\n    position: absolute;\n    padding-top: 21px;\n\n    > div {\n      color: #fff;\n      padding: 16px;\n      min-width: 210px;\n      background-color: #0A101C;\n\n      > a {\n        display: block;\n        font-weight: 700;\n        margin: 0;\n        margin-bottom: 16px;\n        text-decoration: none;\n\n        &:last-child {\n          margin-bottom: 0;\n        }\n      }\n    }\n  }\n\n  &.open {\n    .dropdown {\n      display: block;\n    }\n  }\n\n"], ["\n  cursor: pointer;\n  display: inline;\n  position: relative;\n\n  > a {\n    font-family: \"kallisto\", sans-serif;\n    font-weight: 700;\n    margin: 0 15px;\n\n    > svg {\n      top: -2px;\n      display: inline;\n      position: relative;\n      vertical-align: middle;\n      width: 1em;\n      height: 1em;\n      font-size: 1.71429rem;\n      fill: currentcolor;\n    }\n  }\n\n  &.open, &:hover {\n    > a {\n      color: var(--extra-color-1);\n      text-shadow: 0px 0px 20px var(--extra-color-1);\n      text-decoration: none;\n\n      > svg {\n        fill: var(--extra-color-1);\n      }\n    }\n  }\n\n  &.open > a > svg {\n    transform: rotate(180deg);\n  }\n\n  .dropdown {\n    top: 100%;\n    left: 0;\n    display: none;\n    z-index: 10;\n    position: absolute;\n    padding-top: 21px;\n\n    > div {\n      color: #fff;\n      padding: 16px;\n      min-width: 210px;\n      background-color: #0A101C;\n\n      > a {\n        display: block;\n        font-weight: 700;\n        margin: 0;\n        margin-bottom: 16px;\n        text-decoration: none;\n\n        &:last-child {\n          margin-bottom: 0;\n        }\n      }\n    }\n  }\n\n  &.open {\n    .dropdown {\n      display: block;\n    }\n  }\n\n"])));
var StyledNavInner = styled_components_1.default.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  padding: 0 24px;\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  align-items: center;\n  height: 100%;\n\n  @media (min-width: 1200px) {\n    max-width: 1200px;\n    margin: 0 auto;\n  }\n\n  @media (max-width: 767px) {\n    .gamePrice {\n      text-align: center;\n    }\n  }\n"], ["\n  padding: 0 24px;\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  align-items: center;\n  height: 100%;\n\n  @media (min-width: 1200px) {\n    max-width: 1200px;\n    margin: 0 auto;\n  }\n\n  @media (max-width: 767px) {\n    .gamePrice {\n      text-align: center;\n    }\n  }\n"])));
var StyledButton = styled_components_1.default(Button_1.Button)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  padding: 10px 0;\n  height: 44px;\n  min-width: 64px;\n\n  svg {\n    height: 18px;\n    width: auto;\n  }\n"], ["\n  padding: 10px 0;\n  height: 44px;\n  min-width: 64px;\n\n  svg {\n    height: 18px;\n    width: auto;\n  }\n"])));
var StyledMobileMenu = styled_components_1.default.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  position: fixed;\n  inset: 0px;\n  z-index: 1200;\n  visibility: hidden;\n  opacity: 0;\n\n  &.open {\n    visibility: visible;\n    opacity: 1;\n\n    .mobileMenuBackdrop {\n      visibility: visible;\n      opacity: 1;\n    }\n\n    .mobileMenuWrapper {\n      transform: translateX(0);\n    }\n  }\n\n  &.close {\n    visibility: visible;\n    opacity: 1;\n\n    .mobileMenuBackdrop {\n      opacity: 0;\n    }\n\n    .mobileMenuWrapper {\n      transform: translateX(-100%);\n    }\n  }\n"], ["\n  position: fixed;\n  inset: 0px;\n  z-index: 1200;\n  visibility: hidden;\n  opacity: 0;\n\n  &.open {\n    visibility: visible;\n    opacity: 1;\n\n    .mobileMenuBackdrop {\n      visibility: visible;\n      opacity: 1;\n    }\n\n    .mobileMenuWrapper {\n      transform: translateX(0);\n    }\n  }\n\n  &.close {\n    visibility: visible;\n    opacity: 1;\n\n    .mobileMenuBackdrop {\n      opacity: 0;\n    }\n\n    .mobileMenuWrapper {\n      transform: translateX(-100%);\n    }\n  }\n"])));
var StyledMobileBackdrop = styled_components_1.default.div(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  position: fixed;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  inset: 0px;\n  background-color: rgba(10, 16, 28, 0.8);\n  backdrop-filter: blur(5px);\n  z-index: -1;\n  visibility: hidden;\n  opacity: 0;\n  transition: opacity 0.2s ease-in-out;\n;"], ["\n  position: fixed;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  inset: 0px;\n  background-color: rgba(10, 16, 28, 0.8);\n  backdrop-filter: blur(5px);\n  z-index: -1;\n  visibility: hidden;\n  opacity: 0;\n  transition: opacity 0.2s ease-in-out;\n;"])));
var StyledMobileWrapper = styled_components_1.default.div(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  background-color: #0A142A;\n  color: rgb(255, 255, 255);\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 240px;\n  flex: 1 0 auto;\n  z-index: 1200;\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  transform: translateX(-100%);\n  transition: transform 0.2s ease-in-out;\n"], ["\n  background-color: #0A142A;\n  color: rgb(255, 255, 255);\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 240px;\n  flex: 1 0 auto;\n  z-index: 1200;\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  transform: translateX(-100%);\n  transition: transform 0.2s ease-in-out;\n"])));
var StyledMobileMenuClose = styled_components_1.default.div(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  padding-left: 10px;\n  padding-right: 10px;\n  padding-top: 10px;\n\n  svg {\n    fill: currentColor;\n    cursor: pointer;\n    font-size: 35px;\n    width: 1em;\n    height: 1em;\n    filter: drop-shadow(0 0 5px var(--accent));\n  }\n"], ["\n  padding-left: 10px;\n  padding-right: 10px;\n  padding-top: 10px;\n\n  svg {\n    fill: currentColor;\n    cursor: pointer;\n    font-size: 35px;\n    width: 1em;\n    height: 1em;\n    filter: drop-shadow(0 0 5px var(--accent));\n  }\n"])));
var StyledMobileMenuList = styled_components_1.default.ul(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\nlist-style: none;\nmargin: 0px;\npadding: 8px 0px;\nposition: relative;\nborder-radius: 20px;\nbackground-color: rgb(10, 20, 42);\n\na {\n  display: block;\n  padding: 16px 16px;\n  color: inherit;\n  font-family: kallisto, sans-serif;\n  font-size: 18px;\n  \n  &:hover, &.active {\n    background-color: rgba(0, 0, 0, 0.04);\n    color: var(--extra-color-1);\n    text-shadow: 0px 0px 20px var(--extra-color-1);\n  }\n}\n"], ["\nlist-style: none;\nmargin: 0px;\npadding: 8px 0px;\nposition: relative;\nborder-radius: 20px;\nbackground-color: rgb(10, 20, 42);\n\na {\n  display: block;\n  padding: 16px 16px;\n  color: inherit;\n  font-family: kallisto, sans-serif;\n  font-size: 18px;\n  \n  &:hover, &.active {\n    background-color: rgba(0, 0, 0, 0.04);\n    color: var(--extra-color-1);\n    text-shadow: 0px 0px 20px var(--extra-color-1);\n  }\n}\n"])));
var StyledMobileLink = styled_components_1.default(react_router_dom_1.Link)(templateObject_16 || (templateObject_16 = __makeTemplateObject([""], [""])));
var Menu = function (_a) {
    var account = _a.account, login = _a.login, logout = _a.logout, isDark = _a.isDark, toggleTheme = _a.toggleTheme, langs = _a.langs, setLang = _a.setLang, currentLang = _a.currentLang, cakePriceUsd = _a.cakePriceUsd, links = _a.links, profile = _a.profile, children = _a.children;
    var isSm = hooks_1.useMatchBreakpoints().isSm;
    var isMobile = isSm === false;
    var _b = react_1.default.useState(false), open = _b[0], setOpen = _b[1];
    var _c = react_1.useState(false), isOpen = _c[0], setIsOpen = _c[1];
    var _d = react_1.useState(false), isClose = _d[0], setIsClose = _d[1];
    var _e = react_1.useState(true), showMenu = _e[0], setShowMenu = _e[1];
    var refPrevOffset = react_1.useRef(window.pageYOffset);
    var location = react_router_dom_1.useLocation();
    var theme = react_1.useContext(styled_components_1.ThemeContext);
    var handleDrawerOpen = function () {
        setOpen(true);
        document.body.style.overflow = 'hidden';
    };
    var handleDrawerClose = function () {
        document.body.style.overflow = '';
        setIsClose(true);
        setTimeout(function () {
            setIsClose(false);
            setOpen(false);
        }, 200);
    };
    // create dropdown hover effect
    var handleMouseEnter = function () {
        setIsOpen(true);
    };
    var handleMouseLeave = function () {
        setIsOpen(false);
    };
    react_1.useEffect(function () {
        var handleScroll = function () {
            var currentOffset = window.pageYOffset;
            var isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
            var isTopOfPage = currentOffset === 0;
            // Always show the menu when user reach the top
            if (isTopOfPage) {
                setShowMenu(true);
            }
            // Avoid triggering anything at the bottom because of layout shift
            else if (!isBottomOfPage) {
                if (currentOffset < refPrevOffset.current) {
                    // Has scroll up
                    setShowMenu(true);
                }
                else {
                    // Has scroll down
                    setShowMenu(false);
                }
            }
            refPrevOffset.current = currentOffset;
        };
        var throttledHandleScroll = throttle_1.default(handleScroll, 200);
        window.addEventListener("scroll", throttledHandleScroll);
        return function () {
            window.removeEventListener("scroll", throttledHandleScroll);
        };
    }, []);
    react_1.useEffect(function () {
        // handle mobile menu click event
        var mobileMenuElement = document.querySelectorAll('.mobileMenuWrapper a');
        mobileMenuElement.forEach(function (element) {
            element.addEventListener('click', function () {
                handleDrawerClose();
            });
        });
    }, []);
    return (<>
    <Wrapper>
      <StyledNav showMenu={showMenu}>
        <StyledNavInner>
          {!isMobile && (<StyledButton onClick={handleDrawerOpen}>
              <Svg_1.Svg viewBox="0 0 27 19">
                <g id="Group_139" data-name="Group 139" transform="translate(-12.5 5697)">
                  <path id="Line_1" data-name="Line 1" d="M24,1.5H0A1.5,1.5,0,0,1-1.5,0,1.5,1.5,0,0,1,0-1.5H24A1.5,1.5,0,0,1,25.5,0,1.5,1.5,0,0,1,24,1.5Z" transform="translate(14 -5695.5)" fill="currentColor"/>
                  <path id="Line_2" data-name="Line 2" d="M24,1.5H0A1.5,1.5,0,0,1-1.5,0,1.5,1.5,0,0,1,0-1.5H24A1.5,1.5,0,0,1,25.5,0,1.5,1.5,0,0,1,24,1.5Z" transform="translate(14 -5679.5)" fill="currentColor"/>
                  <path id="Line_3" data-name="Line 3" d="M24,1.5H0A1.5,1.5,0,0,1-1.5,0,1.5,1.5,0,0,1,0-1.5H24A1.5,1.5,0,0,1,25.5,0,1.5,1.5,0,0,1,24,1.5Z" transform="translate(14 -5687.5)" fill="currentColor"/>
                </g>
              </Svg_1.Svg>
            </StyledButton>)}
          <div>
            <react_router_dom_1.Link to="/">
              <StyledLogo heading={true} fontSize="20px" textTransform="uppercase">
                Game Theory
              </StyledLogo>
            </react_router_dom_1.Link>
            {cakePriceUsd && (<Text_1.Text fontSize="12px" color="#fff" className="gamePrice" style={{ textShadow: '0px 0px 10px #fff' }}>
                <span className="textGlow">GAME Price:</span> ${cakePriceUsd || '0.00'}
              </Text_1.Text>)}
          </div>
        {isMobile && (<StyledLinksWrapper>
          <StyledLink to='/play' aria-label="Play page" className={location.pathname === '/play' ? 'active' : '' || location.pathname === '/altergene' ? 'active' : ''}>
            Play
          </StyledLink>
          <StyledLink to='/swap' aria-label="Swap page" className={location.pathname === '/swap' || location.pathname === '/pool' || location.pathname === '/add' ? 'active' : '' || location.pathname === '/find' ? 'active' : ''}>
            Swap
          </StyledLink>
          <StyledLink to='/farms' aria-label="Earn page" className={location.pathname === '/farms' ? 'active' : '' || location.pathname === '/bonds' ? 'active' : '' || location.pathname === '/redeem' ? 'active' : '' || location.pathname === '/rewards' ? 'active' : ''}>
            Earn
          </StyledLink>
          <StyledDropdown onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ display: "inline" }} className={"" + (isOpen ? 'open' : '')}>
            <a>
              More
              <icons_1.MoreIcon />
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
                <StyledLink to="/about#community">
                  Community
                </StyledLink>
                <StyledLink as="a" href="https://snowtrace.io/address/0x148988f296b5B8B8e619434546A4C674397777dd" target="_blank">
                  Treasury Wallet
                </StyledLink>
              </div>
            </div>
          </StyledDropdown>
        </StyledLinksWrapper>)}
        {!!login && !!logout && (<Flex_1.default>
            <UserBlock_1.default account={account} login={login} logout={logout}/>
          </Flex_1.default>)}
        </StyledNavInner>
      </StyledNav>

        {!isMobile && (<StyledMobileMenu className={(open ? 'open' : '') + " " + (isClose ? 'close' : '')}>
            <StyledMobileBackdrop className="mobileMenuBackdrop" onClick={handleDrawerClose}/>
            <StyledMobileWrapper className="mobileMenuWrapper">
              <StyledMobileMenuClose onClick={handleDrawerClose}>
                <Svg_1.Svg viewBox="0 0 24 24" className="textGlow pink">
                  <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </Svg_1.Svg>
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
                <StyledMobileLink to="/about#community">
                  Community
                </StyledMobileLink>
                </li>
                <li>
                <StyledMobileLink as="a" href="https://snowtrace.io/address/0x148988f296b5B8B8e619434546A4C674397777dd" target="_blank">
                  Treasury Wallet
                </StyledMobileLink>
                </li>
              </StyledMobileMenuList>
            </StyledMobileWrapper>
          </StyledMobileMenu>)}

      <BodyWrapper>
        <Inner isPushed={true} showMenu={showMenu}>
          {!location.pathname.includes("altergene") && children}
        </Inner>
      </BodyWrapper>
    </Wrapper>
    {location.pathname.includes("altergene") && children}
      </>);
};
exports.default = Menu;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16;
