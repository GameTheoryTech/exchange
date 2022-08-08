"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Top = exports.Default = void 0;
var react_1 = require("react");
var Button_1 = require("../Button/Button");
var Flex_1 = require("../Box/Flex");
var Dropdown_1 = require("./Dropdown");
exports.default = {
    title: "Components/Dropdown",
    component: Dropdown_1.default,
    argTypes: {},
};
var Default = function () {
    return (<div>
      <Dropdown_1.default target={<Button_1.default>Hover</Button_1.default>}>
        {__spreadArray([], Array(30), true).map(function () { return (<div>Content</div>); })}
      </Dropdown_1.default>
    </div>);
};
exports.Default = Default;
var Top = function () {
    return (<Flex_1.default justifyContent="space-between" style={{ marginTop: "400px" }}>
      <Dropdown_1.default position="top-right" target={<Button_1.default>Top right</Button_1.default>}>
        {__spreadArray([], Array(20), true).map(function () { return (<div>Content</div>); })}
      </Dropdown_1.default>
      <Dropdown_1.default position="top" target={<Button_1.default>Top</Button_1.default>}>
        {__spreadArray([], Array(20), true).map(function () { return (<div>Content</div>); })}
      </Dropdown_1.default>
    </Flex_1.default>);
};
exports.Top = Top;
