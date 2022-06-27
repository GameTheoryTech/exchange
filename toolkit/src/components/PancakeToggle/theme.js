"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dark = exports.light = void 0;
var colors_1 = require("../../theme/colors");
exports.light = {
    handleBackground: colors_1.lightColors.backgroundAlt,
    handleShadow: colors_1.lightColors.textDisabled,
};
exports.dark = {
    handleBackground: colors_1.darkColors.backgroundAlt,
    handleShadow: colors_1.darkColors.textDisabled,
};
