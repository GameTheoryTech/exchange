"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar)
                    ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
    return to.concat(ar || Array.prototype.slice.call(from));
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
var langs = __spreadArray([], Array(20), true).map(function (_, i) { return ({ code: "en".concat(i), language: "English".concat(i) }); });
// This hook is used to simulate a props change, and force a re rendering
var useProps = function () {
    var _a = (0, react_1.useState)({
        account: "0xbdda50183d817c3289f895a4472eb475967dc980",
        login: noop_1.default,
        logout: noop_1.default,
        isDark: false,
        toggleTheme: noop_1.default,
        langs: langs,
        setLang: noop_1.default,
        currentLang: "EN",
        cakePriceUsd: 0.023158668932877668,
        links: config_1.links,
        profile: null,
    }), props = _a[0], setProps = _a[1];
    (0, react_1.useEffect)(function () {
        var interval = setInterval(function () {
            setProps({
                account: "0xbdda50183d817c3289f895a4472eb475967dc980",
                login: noop_1.default,
                logout: noop_1.default,
                isDark: false,
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
    return (React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(Menu_1.default, __assign({}, props),
            React.createElement("div", null,
                React.createElement(Heading_1.default, { as: "h1", mb: "8px" }, "Page body"),
                React.createElement(Text_1.default, { as: "p" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut")))));
};
exports.Connected = Connected;
var NotConnected = function () {
    return (React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(Menu_1.default, { account: null, login: noop_1.default, logout: noop_1.default, isDark: false, toggleTheme: noop_1.default, langs: langs, setLang: noop_1.default, currentLang: "EN", links: config_1.links },
            React.createElement("div", null,
                React.createElement("h1", null, "Page body"),
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."))));
};
exports.NotConnected = NotConnected;
var WithoutConnectButton = function () {
    return (React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(Menu_1.default, { isDark: false, toggleTheme: noop_1.default, langs: langs, setLang: noop_1.default, currentLang: "EN", links: config_1.links },
            React.createElement("div", null,
                React.createElement("h1", null, "No connect button on top"),
                "This variant is needed for info site"))));
};
exports.WithoutConnectButton = WithoutConnectButton;
var WithNoProfile = function () {
    return (React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(Menu_1.default, { account: "0xbdda50183d817c3289f895a4472eb475967dc980", login: noop_1.default, logout: noop_1.default, isDark: false, toggleTheme: noop_1.default, langs: langs, setLang: noop_1.default, currentLang: "EN", cakePriceUsd: 0.23158668932877668, links: config_1.links, profile: {
                profileLink: "/profile",
                noProfileLink: "/no-profile",
            } },
            React.createElement("div", null,
                React.createElement(Heading_1.default, { as: "h1", mb: "8px" }, "Page body"),
                React.createElement(Text_1.default, { as: "p" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut")))));
};
exports.WithNoProfile = WithNoProfile;
var WithProfile = function () {
    return (React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(Menu_1.default, { account: "0xbdda50183d817c3289f895a4472eb475967dc980", login: noop_1.default, logout: noop_1.default, isDark: false, toggleTheme: noop_1.default, langs: langs, setLang: noop_1.default, currentLang: "EN", cakePriceUsd: 0.23158668932877668, links: config_1.links, profile: {
                username: "pancakeswap",
                image: "https://pancakeswap.finance/images/nfts/blueberries-preview.png",
                profileLink: "/profile",
                noProfileLink: "/no-profile",
            } },
            React.createElement("div", null,
                React.createElement(Heading_1.default, { as: "h1", mb: "8px" }, "Page body"),
                React.createElement(Text_1.default, { as: "p" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut")))));
};
exports.WithProfile = WithProfile;
var MenuEntryComponent = function () {
    return (React.createElement(Flex_1.default, { justifyContent: "space-between", p: "16px", style: { backgroundColor: "wheat" } },
        React.createElement(MenuEntry_1.MenuEntry, null, "Default"),
        React.createElement(MenuEntry_1.MenuEntry, { secondary: true }, "Secondary"),
        React.createElement(MenuEntry_1.MenuEntry, { isActive: true }, "isActive")));
};
exports.MenuEntryComponent = MenuEntryComponent;
var WithSubmenuSelected = function () {
    return (React.createElement(react_router_dom_1.MemoryRouter, { initialEntries: ["/teams"] },
        React.createElement(Menu_1.default, { account: "0xbdda50183d817c3289f895a4472eb475967dc980", login: noop_1.default, logout: noop_1.default, isDark: false, toggleTheme: noop_1.default, langs: langs, setLang: noop_1.default, currentLang: "EN", cakePriceUsd: 0.23158668932877668, links: config_1.links, profile: {
                username: "pancakeswap",
                image: "https://pancakeswap.finance/images/nfts/blueberries-preview.png",
                profileLink: "/profile",
                noProfileLink: "/no-profile",
            } },
            React.createElement("div", null,
                React.createElement(Heading_1.default, { as: "h1", mb: "8px" }, "Submenu leaderboard selected")))));
};
exports.WithSubmenuSelected = WithSubmenuSelected;
