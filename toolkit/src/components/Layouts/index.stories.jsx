"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cards = exports.Base = void 0;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var _1 = require(".");
exports.default = {
    title: "Components/Layouts",
    argTypes: {},
};
var Stub = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  background: #1fc7d4;\n  height: 300px;\n"], ["\n  width: 100%;\n  background: #1fc7d4;\n  height: 300px;\n"])));
var Base = function () {
    return (<_1.BaseLayout>
      {__spreadArray([], Array(24)).map(function (value) { return (<Stub key={value}/>); })}
    </_1.BaseLayout>);
};
exports.Base = Base;
var Cards = function () {
    return (<_1.CardsLayout>
      {__spreadArray([], Array(10)).map(function (value) { return (<Stub key={value}/>); })}
    </_1.CardsLayout>);
};
exports.Cards = Cards;
var templateObject_1;
