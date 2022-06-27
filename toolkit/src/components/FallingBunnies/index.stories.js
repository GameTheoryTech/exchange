"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var react_1 = require("react");
var FallingBunnies_1 = require("./FallingBunnies");
exports.default = {
    title: "Components/FallingBunnies",
    component: FallingBunnies_1.default,
    argTypes: {},
};
var Default = function () {
    return React.createElement(FallingBunnies_1.default, null);
};
exports.Default = Default;
