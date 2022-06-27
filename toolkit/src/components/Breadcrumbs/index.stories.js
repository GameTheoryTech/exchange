"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSeparator = exports.Default = void 0;
var react_1 = require("react");
var Text_1 = require("../Text/Text");
var Link_1 = require("../Link/Link");
var Logo_1 = require("../Svg/Icons/Logo");
var PresentWon_1 = require("../Svg/Icons/PresentWon");
var Breadcrumbs_1 = require("./Breadcrumbs");
exports.default = {
    title: "Components/Breadcrumbs",
    component: Breadcrumbs_1.default,
    argTypes: {},
};
var Default = function () {
    return (React.createElement(Text_1.default, { p: "32px" },
        React.createElement(Breadcrumbs_1.default, { mb: "32px" },
            React.createElement(Link_1.default, { href: "/", color: "secondary", style: { fontWeight: 400 } }, "Link"),
            React.createElement(Text_1.default, { color: "textDisabled" }, "Crumb 1"),
            React.createElement(Text_1.default, { color: "textDisabled" }, "Crumb 2")),
        React.createElement(Breadcrumbs_1.default, null,
            React.createElement(Text_1.default, null, "PancakeSwap"),
            React.createElement(Text_1.default, null, "The #1 AMM and yield farm on Binance Smart Chain."))));
};
exports.Default = Default;
var CustomSeparator = function () {
    return (React.createElement(Text_1.default, { p: "32px" },
        React.createElement(Text_1.default, { mb: "16px" },
            React.createElement(Breadcrumbs_1.default, { separator: React.createElement(Logo_1.default, { width: "24px" }) },
                React.createElement(Link_1.default, { href: "/", color: "secondary", style: { fontWeight: 400 } }, "Link"),
                React.createElement(Text_1.default, { color: "textDisabled" }, "Crumb 1"),
                React.createElement(Text_1.default, { color: "textDisabled" }, "Crumb 2"))),
        React.createElement(Text_1.default, { mb: "16px" },
            React.createElement(Breadcrumbs_1.default, { separator: React.createElement(PresentWon_1.default, { width: "48px" }) },
                React.createElement(Link_1.default, { href: "/", color: "failure", style: { fontWeight: 400 } }, "Link"),
                React.createElement(Link_1.default, { href: "/", color: "primary", style: { fontWeight: 400 } }, "Link 2"),
                React.createElement(Text_1.default, { color: "textDisabled" }, "Crumb 2")))));
};
exports.CustomSeparator = CustomSeparator;
