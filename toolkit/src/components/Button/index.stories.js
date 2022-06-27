"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expandable = exports.Variants = exports.Anchors = exports.Default = void 0;
var lodash_1 = require("lodash");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var styled_components_1 = require("styled-components");
var Box_1 = require("../Box/Box");
var Flex_1 = require("../Box/Flex");
var Svg_1 = require("../Svg");
var IconButton_1 = require("./IconButton");
var Button_1 = require("./Button");
var ExpandableButton_1 = require("./ExpandableButton");
var types_1 = require("./types");
exports.default = {
    title: "Components/Button",
    component: Button_1.default,
    argTypes: {},
};
var Row = (0, styled_components_1.default)(Flex_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-bottom: 32px;\n  & > button + button,\n  & > a + a {\n    margin-left: 16px;\n  }\n"], ["\n  margin-bottom: 32px;\n  & > button + button,\n  & > a + a {\n    margin-left: 16px;\n  }\n"])));
var Default = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement(Box_1.default, { mb: "32px" },
            React.createElement("button", { type: "button" }, "Unstyled Button")),
        React.createElement(Box_1.default, { mb: "32px" }, Object.values(types_1.variants).map(function (variant) {
            return (React.createElement(Box_1.default, { key: variant, mb: "32px" }, Object.values(types_1.scales).map(function (scale) {
                return (React.createElement(Button_1.default, { key: scale, variant: variant, scale: scale, mr: "8px" }, "".concat((0, lodash_1.capitalize)(variant), " ").concat(scale.toUpperCase())));
            })));
        })),
        React.createElement(Box_1.default, null,
            React.createElement(Button_1.default, { mr: "8px", disabled: true }, "Disabled"),
            React.createElement(Button_1.default, { variant: "secondary", disabled: true }, "Disabled"))));
};
exports.Default = Default;
var Anchors = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement(Box_1.default, { mb: "32px" }, Object.values(types_1.variants).map(function (variant) {
            return (React.createElement(Box_1.default, { key: variant, mb: "32px" }, Object.values(types_1.scales).map(function (scale) {
                return (React.createElement(Button_1.default, { as: "a", href: "https://pancakeswap.finance", key: scale, variant: variant, scale: scale, external: true, mr: "8px" }, "".concat((0, lodash_1.capitalize)(variant), " anchor ").concat(scale.toUpperCase())));
            })));
        })),
        React.createElement(Box_1.default, null,
            React.createElement(Button_1.default, { as: "a", href: "https://pancakeswap.finance", mr: "8px", external: true, disabled: true }, "Disabled"),
            React.createElement(Button_1.default, { as: "a", href: "https://pancakeswap.finance", variant: "secondary", external: true, disabled: true }, "Disabled"))));
};
exports.Anchors = Anchors;
var Variants = function () {
    return (React.createElement(Box_1.default, { width: "640px" },
        React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement(Row, null,
                React.createElement(Button_1.default, { as: react_router_dom_1.Link, to: "/router-link", variant: "secondary" }, "As an React Router link")),
            React.createElement(Row, null,
                React.createElement(Button_1.default, { width: "100%" }, "Full size")),
            React.createElement(Row, null,
                React.createElement(Button_1.default, { isLoading: true, endIcon: React.createElement(Svg_1.AutoRenewIcon, { spin: true, color: "currentColor" }) }, "Approving"),
                React.createElement(Button_1.default, { isLoading: true, variant: "success" }, "Approving")),
            React.createElement(Row, null,
                React.createElement(Button_1.default, { startIcon: React.createElement(Svg_1.LogoIcon, null) }, "Start Icon"),
                React.createElement(Button_1.default, { endIcon: React.createElement(Svg_1.LogoIcon, null) }, "End Icon"),
                React.createElement(Button_1.default, { startIcon: React.createElement(Svg_1.LogoIcon, null), endIcon: React.createElement(Svg_1.LogoIcon, null) }, "Start & End Icon")),
            React.createElement(Row, null,
                React.createElement(IconButton_1.default, null,
                    React.createElement(Svg_1.LogoIcon, null)),
                React.createElement(IconButton_1.default, { variant: "secondary" },
                    React.createElement(Svg_1.AddIcon, null))),
            React.createElement(Row, null,
                React.createElement(IconButton_1.default, { scale: "sm", variant: "danger" },
                    React.createElement(Svg_1.LogoIcon, null)),
                React.createElement(IconButton_1.default, { scale: "sm", variant: "success" },
                    React.createElement(Svg_1.AddIcon, { color: "currentColor" }))))));
};
exports.Variants = Variants;
var Expandable = function () {
    var _a = (0, react_1.useState)(false), expanded = _a[0], setExpanded = _a[1];
    return (React.createElement(Box_1.default, { width: "640px" },
        React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement(Row, null,
                React.createElement(ExpandableButton_1.ExpandableButton, { expanded: expanded, onClick: function () { return setExpanded(function (prev) { return !prev; }); } }),
                React.createElement(ExpandableButton_1.ExpandableLabel, { expanded: expanded, onClick: function () { return setExpanded(function (prev) { return !prev; }); } }, "ExpandableLabel")))));
};
exports.Expandable = Expandable;
var templateObject_1;
