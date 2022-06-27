"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar)
                    ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
    return to.concat(ar || Array.prototype.slice.call(from));
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
    return (React.createElement(_1.BaseLayout, null, __spreadArray([], Array(24), true).map(function (value) { return (React.createElement(Stub, { key: value })); })));
};
exports.Base = Base;
var Cards = function () {
    return (React.createElement(_1.CardsLayout, null, __spreadArray([], Array(10), true).map(function (value) { return (React.createElement(Stub, { key: value })); })));
};
exports.Cards = Cards;
var templateObject_1;
