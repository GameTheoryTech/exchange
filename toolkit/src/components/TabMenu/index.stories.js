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
exports.Tabs = exports.Default = void 0;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var TabMenu_1 = require("./TabMenu");
var Tab_1 = require("./Tab");
exports.default = {
    title: "Components/Tab Menu",
    component: TabMenu_1.default,
    argTypes: {},
};
var Row = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-bottom: 32px;\n"], ["\n  margin-bottom: 32px;\n"])));
var Default = function () {
    var _a = (0, react_1.useState)(0), index = _a[0], setIndex = _a[1];
    var _b = (0, react_1.useState)(0), index2 = _b[0], setIndex2 = _b[1];
    var _c = (0, react_1.useState)(0), index3 = _c[0], setIndex3 = _c[1];
    var handleClick = function (newIndex) { return setIndex(newIndex); };
    var handleClick2 = function (newIndex) { return setIndex2(newIndex); };
    var handleClick3 = function (newIndex) { return setIndex3(newIndex); };
    return (React.createElement(React.Fragment, null,
        React.createElement(Row, null,
            React.createElement(TabMenu_1.default, { activeIndex: index, onItemClick: handleClick },
                React.createElement(Tab_1.default, null, "Total"),
                React.createElement(Tab_1.default, null, "Cakers"),
                React.createElement(Tab_1.default, null, "Flippers"),
                React.createElement(Tab_1.default, null, "Storm"))),
        React.createElement(Row, null,
            React.createElement(TabMenu_1.default, { activeIndex: index2, onItemClick: handleClick2 },
                React.createElement(Tab_1.default, null, "#1 Team"),
                React.createElement(Tab_1.default, null, "#2 Team"),
                React.createElement(Tab_1.default, null, "#3 Team"))),
        React.createElement(Row, null,
            React.createElement(TabMenu_1.default, { activeIndex: index3, onItemClick: handleClick3 },
                React.createElement(Tab_1.default, null, "Really long tab name"),
                React.createElement(Tab_1.default, null, "Short"),
                React.createElement(Tab_1.default, null, "Medium length")))));
};
exports.Default = Default;
var Tabs = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement(Row, null,
            React.createElement(Tab_1.default, null, "Default"),
            React.createElement(Tab_1.default, { color: "primary", backgroundColor: "secondary" }, "Custom colors")),
        React.createElement(Row, null,
            React.createElement(Tab_1.default, { scale: "md" }, "Small scale (md)"),
            React.createElement(Tab_1.default, { scale: "lg" }, "Large scale (lg)"))));
};
exports.Tabs = Tabs;
var templateObject_1;
