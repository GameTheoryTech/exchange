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
var StyledPancakeToggle_1 = require("./StyledPancakeToggle");
var types_1 = require("./types");
var PancakeToggle = function (_a) {
    var checked = _a.checked, _b = _a.scale, scale = _b === void 0 ? types_1.scales.MD : _b, props = __rest(_a, ["checked", "scale"]);
    return (<StyledPancakeToggle_1.PancakeStack scale={scale}>
    <StyledPancakeToggle_1.PancakeInput id={props.id || "pancake-toggle"} scale={scale} type="checkbox" checked={checked} {...props}/>
    {/*<PancakeLabel scale={scale} checked={checked} htmlFor={props.id || "pancake-toggle"}>*/}
    {/*  <div className="pancakes">*/}
    {/*    <div className="pancake" />*/}
    {/*    <div className="pancake" />*/}
    {/*    <div className="pancake" />*/}
    {/*    <div className="butter" />*/}
    {/*  </div>*/}
    {/*</PancakeLabel>*/}
  </StyledPancakeToggle_1.PancakeStack>);
};
PancakeToggle.defaultProps = {
    scale: types_1.scales.MD,
};
exports.default = PancakeToggle;
