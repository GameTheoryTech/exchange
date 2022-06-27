"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var react_1 = require("react");
var Checkbox_1 = require("./Checkbox");
exports.default = {
    title: "Components/Checkbox",
    component: Checkbox_1.default,
    argTypes: {},
};
var Default = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { marginBottom: "32px" } },
            React.createElement(Checkbox_1.default, null)),
        React.createElement("div", null,
            React.createElement(Checkbox_1.default, { scale: "sm" }))));
};
exports.Default = Default;
