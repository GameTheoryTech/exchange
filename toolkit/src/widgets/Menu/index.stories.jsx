"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithSubmenuSelected = exports.MenuEntryComponent = exports.WithProfile = exports.WithNoProfile = exports.WithoutConnectButton = exports.NotConnected = exports.Connected = void 0;
var react_1 = require("react");
var noop_1 = require("lodash/noop");
var react_router_dom_1 = require("react-router-dom");
var Flex_1 = require("../../components/Box/Flex");
var Heading_1 = require("../../components/Heading/Heading");
var Text_1 = require("../../components/Text/Text");
var MenuEntry_1 = require("./components/MenuEntry");
var Menu_1 = require("./Menu");
var config_1 = require("./config");
exports.default = {
    title: "Widgets/Menu",
    component: Menu_1.default,
    argTypes: {},
};
var langs = __spreadArray([], Array(20)).map(function (_, i) { return ({ code: "en" + i, language: "English" + i }); });
// This hook is used to simulate a props change, and force a re rendering
var useProps = function () {
    var _a = react_1.useState({
        account: "0xbdda50183d817c3289f895a4472eb475967dc980",
        login: noop_1.default,
        logout: noop_1.default,
        isDark: true,
        toggleTheme: noop_1.default,
        langs: langs,
        setLang: noop_1.default,
        currentLang: "EN",
        cakePriceUsd: 0.023158668932877668,
        links: config_1.links,
        profile: null,
    }), props = _a[0], setProps = _a[1];
    react_1.useEffect(function () {
        var interval = setInterval(function () {
            setProps({
                account: "0xbdda50183d817c3289f895a4472eb475967dc980",
                login: noop_1.default,
                logout: noop_1.default,
                isDark: true,
                toggleTheme: noop_1.default,
                langs: langs,
                setLang: noop_1.default,
                currentLang: "EN",
                cakePriceUsd: 0.023158668932877668,
                links: config_1.links,
                profile: null,
            });
        }, 2000);
        return function () {
            clearInterval(interval);
        };
    }, []);
    return props;
};
var Connected = function () {
    var props = useProps();
    return (<react_router_dom_1.BrowserRouter>
      <Menu_1.default {...props}>
        <div>
          <Heading_1.default as="h1" mb="8px">
            Page body
          </Heading_1.default>
          <Text_1.default as="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut
          </Text_1.default>
        </div>
      </Menu_1.default>
    </react_router_dom_1.BrowserRouter>);
};
exports.Connected = Connected;
var NotConnected = function () {
    return (<react_router_dom_1.BrowserRouter>
      <Menu_1.default account={null} login={noop_1.default} logout={noop_1.default} isDark={false} toggleTheme={noop_1.default} langs={langs} setLang={noop_1.default} currentLang="EN" links={config_1.links}>
        <div>
          <h1>Page body</h1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
          eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </div>
      </Menu_1.default>
    </react_router_dom_1.BrowserRouter>);
};
exports.NotConnected = NotConnected;
var WithoutConnectButton = function () {
    return (<react_router_dom_1.BrowserRouter>
      <Menu_1.default isDark={true} toggleTheme={noop_1.default} langs={langs} setLang={noop_1.default} currentLang="EN" links={config_1.links}>
        <div>
          <h1>No connect button on top</h1>
          This variant is needed for info site
        </div>
      </Menu_1.default>
    </react_router_dom_1.BrowserRouter>);
};
exports.WithoutConnectButton = WithoutConnectButton;
var WithNoProfile = function () {
    return (<react_router_dom_1.BrowserRouter>
      <Menu_1.default account="0xbdda50183d817c3289f895a4472eb475967dc980" login={noop_1.default} logout={noop_1.default} isDark={true} toggleTheme={noop_1.default} langs={langs} setLang={noop_1.default} currentLang="EN" cakePriceUsd={0.23158668932877668} links={config_1.links} profile={{
            profileLink: "/profile",
            noProfileLink: "/no-profile",
        }}>
        <div>
          <Heading_1.default as="h1" mb="8px">
            Page body
          </Heading_1.default>
          <Text_1.default as="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut
          </Text_1.default>
        </div>
      </Menu_1.default>
    </react_router_dom_1.BrowserRouter>);
};
exports.WithNoProfile = WithNoProfile;
var WithProfile = function () {
    return (<react_router_dom_1.BrowserRouter>
      <Menu_1.default account="0xbdda50183d817c3289f895a4472eb475967dc980" login={noop_1.default} logout={noop_1.default} isDark={true} toggleTheme={noop_1.default} langs={langs} setLang={noop_1.default} currentLang="EN" cakePriceUsd={0.23158668932877668} links={config_1.links} profile={{
            username: "pancakeswap",
            image: "https://pancakeswap.finance/images/nfts/blueberries-preview.png",
            profileLink: "/profile",
            noProfileLink: "/no-profile",
        }}>
        <div>
          <Heading_1.default as="h1" mb="8px">
            Page body
          </Heading_1.default>
          <Text_1.default as="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut
          </Text_1.default>
        </div>
      </Menu_1.default>
    </react_router_dom_1.BrowserRouter>);
};
exports.WithProfile = WithProfile;
var MenuEntryComponent = function () {
    return (<Flex_1.default justifyContent="space-between" p="16px" style={{ backgroundColor: "wheat" }}>
      <MenuEntry_1.MenuEntry>Default</MenuEntry_1.MenuEntry>
      <MenuEntry_1.MenuEntry secondary>Secondary</MenuEntry_1.MenuEntry>
      <MenuEntry_1.MenuEntry isActive>isActive</MenuEntry_1.MenuEntry>
    </Flex_1.default>);
};
exports.MenuEntryComponent = MenuEntryComponent;
var WithSubmenuSelected = function () {
    return (<react_router_dom_1.MemoryRouter initialEntries={["/teams"]}>
      <Menu_1.default account="0xbdda50183d817c3289f895a4472eb475967dc980" login={noop_1.default} logout={noop_1.default} isDark={true} toggleTheme={noop_1.default} langs={langs} setLang={noop_1.default} currentLang="EN" cakePriceUsd={0.23158668932877668} links={config_1.links} profile={{
            username: "pancakeswap",
            image: "https://pancakeswap.finance/images/nfts/blueberries-preview.png",
            profileLink: "/profile",
            noProfileLink: "/no-profile",
        }}>
        <div>
          <Heading_1.default as="h1" mb="8px">
            Submenu leaderboard selected
          </Heading_1.default>
        </div>
      </Menu_1.default>
    </react_router_dom_1.MemoryRouter>);
};
exports.WithSubmenuSelected = WithSubmenuSelected;
