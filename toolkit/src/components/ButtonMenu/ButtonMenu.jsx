"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var styled_system_1 = require("styled-system");
var types_1 = require("../Button/types");
var getBackgroundColor = function (_a) {
    var theme = _a.theme, variant = _a.variant;
    return theme.colors[variant === types_1.variants.SUBTLE ? "input" : "tertiary"];
};
var getBorderColor = function (_a) {
    var theme = _a.theme, variant = _a.variant;
    return theme.colors[variant === types_1.variants.SUBTLE ? "inputSecondary" : "disabled"];
};
var StyledButtonMenu = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: ", ";\n  border-radius: 16px;\n  display: inline-flex;\n  border: 1px solid ", ";\n\n  & > button + button,\n  & > a + a {\n    margin-left: 2px; // To avoid focus shadow overlap\n  }\n  ", "\n"], ["\n  background-color: ", ";\n  border-radius: 16px;\n  display: inline-flex;\n  border: 1px solid ", ";\n\n  & > button + button,\n  & > a + a {\n    margin-left: 2px; // To avoid focus shadow overlap\n  }\n  ", "\n"])), getBackgroundColor, getBorderColor, styled_system_1.space);
var ButtonMenu = function (_a) {
    var _b = _a.activeIndex, activeIndex = _b === void 0 ? 0 : _b, _c = _a.scale, scale = _c === void 0 ? types_1.scales.MD : _c, _d = _a.variant, variant = _d === void 0 ? types_1.variants.PRIMARY : _d, onItemClick = _a.onItemClick, children = _a.children, props = __rest(_a, ["activeIndex", "scale", "variant", "onItemClick", "children"]);
    return (<StyledButtonMenu variant={variant} {...props}>
      {react_1.Children.map(children, function (child, index) {
            return react_1.cloneElement(child, {
                isActive: activeIndex === index,
                onClick: onItemClick ? function () { return onItemClick(index); } : undefined,
                scale: scale,
                variant: variant,
            });
        })}
    </StyledButtonMenu>);
};
exports.default = ButtonMenu;
var templateObject_1;
