"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.ParentSize = exports.Animation = exports.Avatar = exports.Default = void 0;
var react_1 = require("react");
var Skeleton_1 = require("./Skeleton");
exports.default = {
    title: "Components/Skeleton",
    component: Skeleton_1.default,
    argTypes: {
        width: { control: "number" },
        height: { control: "number" },
    },
};
var Default = function (args) {
    return React.createElement(Skeleton_1.default, __assign({}, args));
};
exports.Default = Default;
exports.Avatar = exports.Default.bind({});
exports.Avatar.args = {
    width: 40,
    height: 40,
    variant: "circle",
};
exports.Animation = exports.Default.bind({});
exports.Animation.args = {
    width: 100,
    height: 200,
    animation: "waves",
};
var ParentSize = function (args) {
    return (React.createElement("div", { style: { width: 200, height: 90 } },
        " ",
        React.createElement(Skeleton_1.default, __assign({}, args)),
        " "));
};
exports.ParentSize = ParentSize;
var Text = function (args) {
    var _a = (0, react_1.useState)(true), loading = _a[0], setLoading = _a[1];
    (0, react_1.useEffect)(function () {
        var timer = setTimeout(function () {
            setLoading(false);
        }, 2000);
        return function () { return clearTimeout(timer); };
    }, []);
    return React.createElement("h1", { style: { width: 200 } }, loading ? React.createElement(Skeleton_1.default, __assign({}, args)) : "H1");
};
exports.Text = Text;
