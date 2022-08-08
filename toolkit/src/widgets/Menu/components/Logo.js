var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { Link } from "react-router-dom";
import Flex from "../../../components/Box/Flex";
import { Box } from "../../../components/Box";
var StyledLink = styled(Link)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  .mobile-icon {\n    width: 32px;\n    ", " {\n      display: none;\n    }\n  }\n  .desktop-icon {\n    width: 212px;\n    margin-left: 16px;\n    height: 28px;\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  .mobile-icon {\n    width: 32px;\n    ", " {\n      display: none;\n    }\n  }\n  .desktop-icon {\n    width: 212px;\n    margin-left: 16px;\n    height: 28px;\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.nav;
}, function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.nav;
});
var Logo = function (_a) {
    var isPushed = _a.isPushed, togglePush = _a.togglePush, isDark = _a.isDark, href = _a.href;
    var isAbsoluteUrl = true; //href.startsWith("http");
    var innerLogo = (React.createElement(React.Fragment, null));
    var theme = useContext(ThemeContext);
    return (React.createElement(Flex, { flexDirection: "row", justifyContent: "space-between", mx: "10px" },
        React.createElement(Box, { mx: "8px" }, isAbsoluteUrl ? (
        // @ts-ignore
        React.createElement(StyledLink, { style: { color: theme.colors.text }, as: "a", href: href, "aria-label": "Home page" }, "Home")) : (React.createElement(StyledLink, { style: { color: theme.colors.text }, to: href, "aria-label": "Home page" }, "Home"))),
        React.createElement(Box, { mx: "8px" },
            React.createElement(StyledLink, { style: { color: theme.colors.text }, as: "a", href: "https://gametheory.link/WbTw", "aria-label": "Home page" }, "Twitter")),
        React.createElement(Box, { mx: "8px" },
            React.createElement(StyledLink, { style: { color: theme.colors.text }, as: "a", href: "https://gametheory.link/WbDc", "aria-label": "Home page" }, "Discord")),
        React.createElement(Box, { mx: "8px" },
            React.createElement(StyledLink, { style: { color: theme.colors.text }, as: "a", href: "https://gametheory.link/WbYt", "aria-label": "Home page" }, "YouTube")),
        React.createElement(Box, { mx: "8px" },
            React.createElement(StyledLink, { style: { color: theme.colors.text }, as: "a", href: "https://gametheory.link/WbMd", "aria-label": "Home page" }, "Medium")),
        React.createElement(Box, { mx: "8px" },
            React.createElement(StyledLink, { style: { color: theme.colors.text }, as: "a", href: "https://gametheory.link/WbGb", "aria-label": "Home page" }, "Docs")),
        React.createElement(Box, { mx: "8px" },
            React.createElement(StyledLink, { style: { color: theme.colors.text }, as: "a", href: "https://old.gametheory.tech", "aria-label": "Home page" }, "Old Site"))));
};
export default React.memo(Logo, function (prev, next) { return prev.isPushed === next.isPushed && prev.isDark === next.isDark; });
var templateObject_1;
