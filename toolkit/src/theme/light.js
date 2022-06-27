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
var theme_1 = require("../components/Alert/theme");
var theme_2 = require("../components/Card/theme");
var theme_3 = require("../components/PancakeToggle/theme");
var theme_4 = require("../components/Radio/theme");
var theme_5 = require("../components/Toggle/theme");
var theme_6 = require("../components/Tooltip/theme");
var theme_7 = require("../widgets/Menu/theme");
var theme_8 = require("../widgets/Modal/theme");
var base_1 = require("./base");
var colors_1 = require("./colors");
var lightTheme = __assign(__assign({}, base_1.default), { isDark: false, alert: theme_1.light, colors: colors_1.lightColors, card: theme_2.light, toggle: theme_5.light, nav: theme_7.light, modal: theme_8.light, pancakeToggle: theme_3.light, radio: theme_4.light, tooltip: theme_6.light });
exports.default = lightTheme;
