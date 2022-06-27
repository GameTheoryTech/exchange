"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledSecondaryImage = exports.StyledPrimaryImage = void 0;
var styled_components_1 = require("styled-components");
var styled_system_1 = require("styled-system");
var types_1 = require("./types");
var TokenImage_1 = require("./TokenImage");
exports.StyledPrimaryImage = styled_components_1.default(TokenImage_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  width: ", "; // 92, 82 are arbitrary numbers to fit the variant\n\n  ", "\n"], ["\n  position: absolute;\n  width: ", "; // 92, 82 are arbitrary numbers to fit the variant\n\n  ", "\n"])), function (_a) {
    var variant = _a.variant;
    return variant === types_1.variants.DEFAULT ? "92%" : "82%";
}, styled_system_1.variant({
    variants: (_a = {},
        _a[types_1.variants.DEFAULT] = {
            bottom: "auto",
            left: 0,
            right: "auto",
            top: 0,
            zIndex: 5,
        },
        _a[types_1.variants.INVERTED] = {
            bottom: 0,
            left: "auto",
            right: 0,
            top: "auto",
            zIndex: 6,
        },
        _a),
}));
exports.StyledSecondaryImage = styled_components_1.default(TokenImage_1.default)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  width: 50%;\n\n  ", "\n"], ["\n  position: absolute;\n  width: 50%;\n\n  ", "\n"])), styled_system_1.variant({
    variants: (_b = {},
        _b[types_1.variants.DEFAULT] = {
            bottom: 0,
            left: "auto",
            right: 0,
            top: "auto",
            zIndex: 6,
        },
        _b[types_1.variants.INVERTED] = {
            bottom: "auto",
            left: 0,
            right: "auto",
            top: 0,
            zIndex: 5,
        },
        _b),
}));
var templateObject_1, templateObject_2;
