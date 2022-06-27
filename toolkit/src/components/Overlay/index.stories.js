"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var react_1 = require("react");
var Overlay_1 = require("./Overlay");
exports.default = {
    title: "Components/Overlay",
    argTypes: {},
};
var Default = function () {
    return React.createElement(Overlay_1.default, { show: true });
};
exports.Default = Default;
