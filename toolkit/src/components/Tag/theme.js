"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.styleVariants = exports.scaleVariants = void 0;
var types_1 = require("./types");
exports.scaleVariants = (_a = {},
    _a[types_1.scales.MD] = {
        height: "28px",
        padding: "0 8px",
        fontSize: "14px",
    },
    _a[types_1.scales.SM] = {
        height: "24px",
        padding: "0 4px",
        fontSize: "12px",
    },
    _a);
exports.styleVariants = (_b = {},
    _b[types_1.variants.PRIMARY] = {
        backgroundColor: "primary",
    },
    _b[types_1.variants.SECONDARY] = {
        backgroundColor: "secondary",
    },
    _b[types_1.variants.SUCCESS] = {
        backgroundColor: "success",
    },
    _b[types_1.variants.TEXTDISABLED] = {
        backgroundColor: "textDisabled",
    },
    _b[types_1.variants.TEXTSUBTLE] = {
        backgroundColor: "textSubtle",
    },
    _b[types_1.variants.BINANCE] = {
        backgroundColor: "binance",
    },
    _b[types_1.variants.FAILURE] = {
        backgroundColor: "failure",
    },
    _b[types_1.variants.WARNING] = {
        backgroundColor: "warning",
    },
    _b);
