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
exports.AsLinks = exports.Default = void 0;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var ButtonMenu_1 = require("./ButtonMenu");
var ButtonMenuItem_1 = require("./ButtonMenuItem");
var Row = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-bottom: 32px;\n\n  & > button + button {\n    margin-left: 16px;\n  }\n"], ["\n  margin-bottom: 32px;\n\n  & > button + button {\n    margin-left: 16px;\n  }\n"])));
exports.default = {
    title: "Components/Button Menu",
    component: ButtonMenu_1.default,
    argTypes: {},
};
var Default = function () {
    var _a = (0, react_1.useState)(0), index = _a[0], setIndex = _a[1];
    var _b = (0, react_1.useState)(1), index1 = _b[0], setIndex1 = _b[1];
    var handleClick = function (newIndex) { return setIndex(newIndex); };
    var handleClick1 = function (newIndex) { return setIndex1(newIndex); };
    return (React.createElement(React.Fragment, null,
        React.createElement(Row, null,
            React.createElement(ButtonMenu_1.default, { activeIndex: index, onItemClick: handleClick },
                React.createElement(ButtonMenuItem_1.default, null, "Button 1"),
                React.createElement(ButtonMenuItem_1.default, null, "Button 2"),
                React.createElement(ButtonMenuItem_1.default, null, "Button 3"),
                React.createElement(ButtonMenuItem_1.default, null, "Button 4"))),
        React.createElement(Row, null,
            React.createElement(ButtonMenu_1.default, { activeIndex: index1, onItemClick: handleClick1, scale: "sm", ml: "24px" },
                React.createElement(ButtonMenuItem_1.default, null, "Button 1"),
                React.createElement(ButtonMenuItem_1.default, null, "Button 2"),
                React.createElement(ButtonMenuItem_1.default, null, "Button 3"),
                React.createElement(ButtonMenuItem_1.default, null, "Button 4"))),
        React.createElement(Row, null,
            React.createElement(ButtonMenu_1.default, { activeIndex: index, onItemClick: handleClick, variant: "subtle" },
                React.createElement(ButtonMenuItem_1.default, null, "Button 1"),
                React.createElement(ButtonMenuItem_1.default, null, "Button 2"),
                React.createElement(ButtonMenuItem_1.default, null, "Button 3"),
                React.createElement(ButtonMenuItem_1.default, null, "Button 4"))),
        React.createElement(Row, null,
            React.createElement(ButtonMenu_1.default, { activeIndex: index1, onItemClick: handleClick1, scale: "sm", variant: "subtle", ml: "24px" },
                React.createElement(ButtonMenuItem_1.default, null, "Button 1"),
                React.createElement(ButtonMenuItem_1.default, null, "Button 2"),
                React.createElement(ButtonMenuItem_1.default, null, "Button 3"),
                React.createElement(ButtonMenuItem_1.default, null, "Button 4")))));
};
exports.Default = Default;
var AsLinks = function () {
    return (React.createElement(Row, null,
        React.createElement(ButtonMenu_1.default, { activeIndex: 0 },
            React.createElement(ButtonMenuItem_1.default, { as: "a", href: "https://pancakeswap.finance" }, "Link 1"),
            React.createElement(ButtonMenuItem_1.default, { as: "a", href: "https://pancakeswap.finance" }, "Link 2"),
            React.createElement(ButtonMenuItem_1.default, { as: "a", href: "https://pancakeswap.finance" }, "Link 3"))));
};
exports.AsLinks = AsLinks;
var templateObject_1;
