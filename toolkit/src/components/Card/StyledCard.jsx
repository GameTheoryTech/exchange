"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = require("styled-components");
var styled_system_1 = require("styled-system");
/**
 * Priority: Warning --> Success --> Active
 */
var getBoxShadow = function (_a) {
    var isActive = _a.isActive, isSuccess = _a.isSuccess, isWarning = _a.isWarning, theme = _a.theme;
    if (isWarning) {
        return theme.card.boxShadowWarning;
    }
    if (isSuccess) {
        return theme.card.boxShadowSuccess;
    }
    if (isActive) {
        return theme.card.boxShadowActive;
    }
    return theme.card.boxShadow;
};
var StyledCard = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border: 2px solid var(--extra-color-1);\n  border-radius: 20px;\n  box-shadow: 0 0 5px var(--extra-color-1);\n  backdrop-filter: blur(15px);\n  overflow: hidden;\n  position: relative;\n\n  &.link {\n    cursor: pointer;\n    transition: box-shadow 0.2s ease-out;\n\n    &:hover {\n      box-shadow: 0px 0px 20px 0px var(--extra-color-1);\n    }\n  }\n\n  ", "\n"], ["\n  border: 2px solid var(--extra-color-1);\n  border-radius: 20px;\n  box-shadow: 0 0 5px var(--extra-color-1);\n  backdrop-filter: blur(15px);\n  overflow: hidden;\n  position: relative;\n\n  &.link {\n    cursor: pointer;\n    transition: box-shadow 0.2s ease-out;\n\n    &:hover {\n      box-shadow: 0px 0px 20px 0px var(--extra-color-1);\n    }\n  }\n\n  ", "\n"])), styled_system_1.space);
StyledCard.defaultProps = {
    isActive: false,
    isSuccess: false,
    isWarning: false,
    isDisabled: false,
};
exports.default = StyledCard;
var templateObject_1;
