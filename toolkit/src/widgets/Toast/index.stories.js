"use strict";
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
exports.WithAction = exports.Default = void 0;
var react_1 = require("react");
var lodash_1 = require("lodash");
var Alert_1 = require("../../components/Alert");
var Button_1 = require("../../components/Button/Button");
var ToastContainer_1 = require("./ToastContainer");
exports.default = {
    title: "Widgets/Toast",
    component: ToastContainer_1.default,
    argTypes: {},
};
var Default = function () {
    var _a = (0, react_1.useState)([]), toasts = _a[0], setToasts = _a[1];
    var handleClick = function (description) {
        if (description === void 0) {
            description = "";
        }
        var now = Date.now();
        var randomToast = {
            id: "id-".concat(now),
            title: "Title: ".concat(now),
            description: description,
            type: Alert_1.alertVariants[(0, lodash_1.sample)(Object.keys(Alert_1.alertVariants))],
        };
        setToasts(function (prevToasts) { return __spreadArray([randomToast], prevToasts, true); });
    };
    var handleRemove = function (id) {
        setToasts(function (prevToasts) { return prevToasts.filter(function (prevToast) { return prevToast.id !== id; }); });
    };
    return (React.createElement("div", null,
        React.createElement(Button_1.default, { type: "button", variant: "secondary", onClick: function () { return handleClick(); } }, "Random Toast"),
        React.createElement(Button_1.default, { type: "button", variant: "secondary", ml: "8px", onClick: function () { return handleClick("This is a description to explain more about the toast"); } }, "Random Toast with Description"),
        React.createElement(ToastContainer_1.default, { toasts: toasts, onRemove: handleRemove })));
};
exports.Default = Default;
var WithAction = function () {
    var _a = (0, react_1.useState)([]), toasts = _a[0], setToasts = _a[1];
    var handleClick = function () {
        var now = Date.now();
        var randomToast = {
            id: "id-".concat(now),
            title: "Title: ".concat(now),
            description: "A description of a toast with a call to action",
            action: {
                text: "Action Button",
                url: "https://pancakeswap.finance",
            },
            type: Alert_1.alertVariants[(0, lodash_1.sample)(Object.keys(Alert_1.alertVariants))],
        };
        setToasts(function (prevToasts) { return __spreadArray([randomToast], prevToasts, true); });
    };
    var handleRemove = function (id) {
        setToasts(function (prevToasts) { return prevToasts.filter(function (prevToast) { return prevToast.id !== id; }); });
    };
    return (React.createElement("div", null,
        React.createElement(Button_1.default, { type: "button", variant: "success", ml: "8px", onClick: function () { return handleClick(); } }, "Random Toast with Action Button"),
        React.createElement(ToastContainer_1.default, { toasts: toasts, onRemove: handleRemove })));
};
exports.WithAction = WithAction;
