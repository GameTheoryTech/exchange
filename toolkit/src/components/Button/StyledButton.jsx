"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = require("styled-components");
var styled_system_1 = require("styled-system");
var theme_1 = require("./theme");
var getDisabledStyles = function (_a) {
    var $isLoading = _a.$isLoading, theme = _a.theme;
    if ($isLoading === true) {
        return "\n      &:disabled,\n      &.pancake-button--disabled {\n        cursor: not-allowed;\n        text-shadow: none;\n        box-shadow: none;\n      }\n    ";
    }
    return "\n    &:disabled,\n    &.pancake-button--disabled {\n      background-color: rgba(0,0,0,0.4);\n      box-shadow: none;\n      color: " + theme.colors.textDisabled + ";\n      cursor: not-allowed;\n      text-shadow: none;\n    }\n  ";
};
/**
 * This is to get around an issue where if you use a Link component
 * React will throw a invalid DOM attribute error
 * @see https://github.com/styled-components/styled-components/issues/135
 */
var getOpacity = function (_a) {
    var _b = _a.$isLoading, $isLoading = _b === void 0 ? false : _b;
    return $isLoading ? ".5" : "1";
};
var StyledButton = styled_components_1.default.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  align-items: center;\n  border: 0;\n  cursor: pointer;\n  display: inline-flex;\n  font-family: inherit;\n  justify-content: center;\n  letter-spacing: 0.03em;\n  line-height: 1.75;\n  outline: 0;\n  border-radius: 20px;\n  font-weight: 700;\n  box-shadow: 0px 0px 20px 0px var(--accent);\n  text-shadow: rgb(255,255,255) 0px 0px 20px;\n  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\n  opacity: ", ";\n\n  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {\n    text-decoration: none;\n    background-color: rgb(178, 22, 156);\n    box-shadow: rgba(0,0,0,.2) 0px 2px 4px -1px, rgba(0,0,0,.14) 0px 4px 5px 0px, rgba(0,0,0,.12) 0px 1px 10px 0px;\n  }\n\n  &:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {\n    opacity: 0.85;\n    transform: translateY(1px);\n    box-shadow: none;\n  }\n\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"], ["\n  align-items: center;\n  border: 0;\n  cursor: pointer;\n  display: inline-flex;\n  font-family: inherit;\n  justify-content: center;\n  letter-spacing: 0.03em;\n  line-height: 1.75;\n  outline: 0;\n  border-radius: 20px;\n  font-weight: 700;\n  box-shadow: 0px 0px 20px 0px var(--accent);\n  text-shadow: rgb(255,255,255) 0px 0px 20px;\n  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\n  opacity: ", ";\n\n  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {\n    text-decoration: none;\n    background-color: rgb(178, 22, 156);\n    box-shadow: rgba(0,0,0,.2) 0px 2px 4px -1px, rgba(0,0,0,.14) 0px 4px 5px 0px, rgba(0,0,0,.12) 0px 1px 10px 0px;\n  }\n\n  &:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {\n    opacity: 0.85;\n    transform: translateY(1px);\n    box-shadow: none;\n  }\n\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"])), getOpacity, getDisabledStyles, styled_system_1.variant({
    prop: "scale",
    variants: theme_1.scaleVariants,
}), styled_system_1.variant({
    variants: theme_1.styleVariants,
}), styled_system_1.layout, styled_system_1.space);
exports.default = StyledButton;
var templateObject_1;
