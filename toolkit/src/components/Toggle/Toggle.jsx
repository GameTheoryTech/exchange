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
var StyledToggle_1 = require("./StyledToggle");
var types_1 = require("./types");
var Toggle = function (_a) {
    var checked = _a.checked, _b = _a.scale, scale = _b === void 0 ? types_1.scales.MD : _b, props = __rest(_a, ["checked", "scale"]);
    var isChecked = !!checked;
    return (<StyledToggle_1.default checked={isChecked} scale={scale}>
      <StyledToggle_1.Input checked={checked} scale={scale} {...props} type="checkbox"/>
      <StyledToggle_1.Handle scale={scale}/>
    </StyledToggle_1.default>);
};
Toggle.defaultProps = {
    scale: types_1.scales.MD,
};
exports.default = Toggle;
