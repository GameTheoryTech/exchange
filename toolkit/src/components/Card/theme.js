"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dark = exports.light = void 0;
var colors_1 = require("../../theme/colors");
var base_1 = require("../../theme/base");
exports.light = {
    background: colors_1.lightColors.backgroundAlt,
    boxShadow: base_1.shadows.level1,
    boxShadowActive: base_1.shadows.active,
    boxShadowSuccess: base_1.shadows.success,
    boxShadowWarning: base_1.shadows.warning,
    cardHeaderBackground: {
        default: colors_1.lightColors.gradients.cardHeader,
        blue: colors_1.lightColors.gradients.blue,
        bubblegum: colors_1.lightColors.gradients.bubblegum,
        violet: colors_1.lightColors.gradients.violet,
    },
    dropShadow: "drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))",
};
exports.dark = {
    background: colors_1.darkColors.backgroundAlt,
    boxShadow: base_1.shadows.level1,
    boxShadowActive: base_1.shadows.active,
    boxShadowSuccess: base_1.shadows.success,
    boxShadowWarning: base_1.shadows.warning,
    cardHeaderBackground: {
        default: colors_1.darkColors.gradients.cardHeader,
        blue: colors_1.darkColors.gradients.blue,
        bubblegum: colors_1.lightColors.gradients.bubblegum,
        violet: colors_1.darkColors.gradients.violet,
    },
    dropShadow: "drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))",
};
