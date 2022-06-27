"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var react_1 = require("react");
var useMatchBreakpoints_1 = require("./useMatchBreakpoints");
exports.default = {
    title: "Hooks/useMatchBreakpoints",
    argTypes: {},
};
var Default = function () {
    var state = (0, useMatchBreakpoints_1.default)();
    return (React.createElement("div", { style: { padding: "32px" } },
        React.createElement("pre", null, JSON.stringify(state, null, 2))));
};
exports.Default = Default;
