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
var Link_1 = require("./Link");
var OpenNew_1 = require("../Svg/Icons/OpenNew");
var LinkExternal = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (<Link_1.default external {...props}>
      {children}
      <OpenNew_1.default color="primary" ml="4px"/>
    </Link_1.default>);
};
exports.default = LinkExternal;
