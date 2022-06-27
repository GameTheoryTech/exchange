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
var theme_6 = require("../widgets/Menu/theme");
var theme_7 = require("../widgets/Modal/theme");
var theme_8 = require("../components/Tooltip/theme");
var base_1 = require("./base");
var colors_1 = require("./colors");
var darkTheme = __assign(__assign({}, base_1.default), { isDark: true, alert: theme_1.dark, colors: colors_1.darkColors, card: theme_2.dark, toggle: theme_5.dark, nav: theme_6.dark, modal: theme_7.dark, pancakeToggle: theme_3.dark, radio: theme_4.dark, tooltip: theme_8.dark });
exports.default = darkTheme;
