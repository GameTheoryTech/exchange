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
var Svg_1 = require("../Svg");
var theme_1 = require("./theme");
var Icons = {
    warning: Svg_1.WarningIcon,
    danger: Svg_1.ErrorIcon,
};
var MessageContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  background-color: gray;\n  padding: 16px;\n  border-radius: 16px;\n  border: solid 1px;\n\n  svg {\n    align-self: flex-start;\n  }\n\n  ", "\n  ", "\n"], ["\n  display: flex;\n  background-color: gray;\n  padding: 16px;\n  border-radius: 16px;\n  border: solid 1px;\n\n  svg {\n    align-self: flex-start;\n  }\n\n  ", "\n  ", "\n"])), styled_system_1.space, styled_system_1.variant({
    variants: theme_1.default,
}));
var Message = function (_a) {
    var children = _a.children, variant = _a.variant, props = __rest(_a, ["children", "variant"]);
    var Icon = Icons[variant];
    return (<MessageContainer variant={variant} {...props}>
      <Icon color={theme_1.default[variant].borderColor} width="24px" mr="12px" style={{ alignSelf: "center" }}/>
      {children}
    </MessageContainer>);
};
exports.default = Message;
var templateObject_1;
