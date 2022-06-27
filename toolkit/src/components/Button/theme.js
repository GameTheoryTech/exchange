"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.styleVariants = exports.scaleVariants = void 0;
var types_1 = require("./types");
exports.scaleVariants = (_a = {},
    _a[types_1.scales.MD] = {
        height: "48px",
        padding: "0 24px",
    },
    _a[types_1.scales.SM] = {
        height: "32px",
        padding: "0 16px",
    },
    _a[types_1.scales.XS] = {
        height: "20px",
        fontSize: "12px",
        padding: "0 8px",
    },
    _a);
exports.styleVariants = (_b = {},
    _b[types_1.variants.PRIMARY] = {
        backgroundColor: "primary",
        color: "white",
    },
    _b[types_1.variants.SECONDARY] = {
        backgroundColor: "transparent",
        border: "2px solid",
        borderColor: "primary",
        boxShadow: "none",
        color: "primary",
        ":disabled": {
            backgroundColor: "transparent",
        },
    },
    _b[types_1.variants.TERTIARY] = {
        backgroundColor: "tertiary",
        boxShadow: "none",
        color: "primary",
    },
    _b[types_1.variants.SUBTLE] = {
        backgroundColor: "textSubtle",
        color: "backgroundAlt",
    },
    _b[types_1.variants.DANGER] = {
        backgroundColor: "failure",
        color: "white",
    },
    _b[types_1.variants.SUCCESS] = {
        backgroundColor: "success",
        color: "white",
    },
    _b[types_1.variants.TEXT] = {
        backgroundColor: "transparent",
        color: "primary",
        boxShadow: "none",
    },
    _b);
