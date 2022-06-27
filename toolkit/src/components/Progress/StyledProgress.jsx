"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
var styled_components_1 = require("styled-components");
var styled_system_1 = require("styled-system");
var themes_1 = require("./themes");
var types_1 = require("./types");
exports.Bar = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  background-color: ", ";\n  height: 100%;\n  transition: width 200ms ease;\n"], ["\n  position: absolute;\n  top: 0;\n  left: 0;\n  background-color: ", ";\n  height: 100%;\n  transition: width 200ms ease;\n"])), function (props) { return (props.primary ? props.theme.colors.secondary : props.theme.colors.secondary + "80"); });
exports.Bar.defaultProps = {
    primary: false,
};
var StyledProgress = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  background-color: ", ";\n  box-shadow: ", ";\n  overflow: hidden;\n\n  ", " {\n    border-top-left-radius: ", ";\n    border-bottom-left-radius: ", ";\n  }\n\n  ", "\n  ", "\n  ", "\n"], ["\n  position: relative;\n  background-color: ", ";\n  box-shadow: ", ";\n  overflow: hidden;\n\n  ", " {\n    border-top-left-radius: ", ";\n    border-bottom-left-radius: ", ";\n  }\n\n  ", "\n  ", "\n  ", "\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.input;
}, function (_a) {
    var theme = _a.theme;
    return theme.shadows.inset;
}, exports.Bar, function (_a) {
    var variant = _a.variant;
    return (variant === types_1.variants.FLAT ? "0" : "32px");
}, function (_a) {
    var variant = _a.variant;
    return (variant === types_1.variants.FLAT ? "0" : "32px");
}, styled_system_1.variant({
    variants: themes_1.styleVariants,
}), styled_system_1.variant({
    prop: "scale",
    variants: themes_1.styleScales,
}), styled_system_1.space);
exports.default = StyledProgress;
var templateObject_1, templateObject_2;
