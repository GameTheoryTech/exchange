"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.styleScales = exports.styleVariants = void 0;
var types_1 = require("./types");
exports.styleVariants = (_a = {},
    _a[types_1.variants.ROUND] = {
        borderRadius: "32px",
    },
    _a[types_1.variants.FLAT] = {
        borderRadius: 0,
    },
    _a);
exports.styleScales = (_b = {},
    _b[types_1.scales.MD] = {
        height: "16px",
    },
    _b[types_1.scales.SM] = {
        height: "8px",
    },
    _b);
exports.default = exports.styleVariants;
