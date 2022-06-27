"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var types_1 = require("./types");
var StyledTag_1 = require("./StyledTag");
var Tag = function (_a) {
    var startIcon = _a.startIcon, endIcon = _a.endIcon, children = _a.children, props = __rest(_a, ["startIcon", "endIcon", "children"]);
    return (<StyledTag_1.StyledTag {...props}>
    {react_1.default.isValidElement(startIcon) &&
            react_1.default.cloneElement(startIcon, {
                mr: "0.5em",
            })}
    {children}
    {react_1.default.isValidElement(endIcon) &&
            react_1.default.cloneElement(endIcon, {
                ml: "0.5em",
            })}
  </StyledTag_1.StyledTag>);
};
Tag.defaultProps = {
    variant: "primary",
    scale: types_1.scales.MD,
    outline: false,
};
exports.default = Tag;
