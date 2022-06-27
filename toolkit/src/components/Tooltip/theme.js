"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dark = exports.light = void 0;
var colors_1 = require("../../theme/colors");
exports.light = {
    background: colors_1.darkColors.backgroundAlt,
    text: colors_1.darkColors.text,
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2), 0px 4px 12px -8px rgba(14, 14, 44, 0.1)",
};
exports.dark = {
    background: colors_1.lightColors.backgroundAlt,
    text: colors_1.lightColors.text,
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2), 0px 4px 12px -8px rgba(14, 14, 44, 0.1)",
};
