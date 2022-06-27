"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var react_1 = require("react");
var Spinner_1 = require("./Spinner");
exports.default = {
    title: "Components/Spinner",
    component: Spinner_1.default,
    argTypes: {},
};
var Default = function () {
    return React.createElement(Spinner_1.default, { size: 50 });
};
exports.Default = Default;
