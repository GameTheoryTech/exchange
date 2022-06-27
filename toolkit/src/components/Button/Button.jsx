"use strict";
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
var getExternalLinkProps_1 = require("../../util/getExternalLinkProps");
var StyledButton_1 = require("./StyledButton");
var types_1 = require("./types");
var Button = function (props) {
    var startIcon = props.startIcon, endIcon = props.endIcon, external = props.external, className = props.className, isLoading = props.isLoading, disabled = props.disabled, children = props.children, rest = __rest(props, ["startIcon", "endIcon", "external", "className", "isLoading", "disabled", "children"]);
    var internalProps = external ? getExternalLinkProps_1.default() : {};
    var isDisabled = isLoading || disabled;
    var classNames = className ? [className] : [];
    if (isLoading) {
        classNames.push("pancake-button--loading");
    }
    if (isDisabled && !isLoading) {
        classNames.push("pancake-button--disabled");
    }
    return (<StyledButton_1.default $isLoading={isLoading} className={classNames.join(" ")} disabled={isDisabled} {...internalProps} {...rest}>
      <>
        {react_1.isValidElement(startIcon) &&
            react_1.cloneElement(startIcon, {
                mr: "0.5rem",
            })}
        {children}
        {react_1.isValidElement(endIcon) &&
            react_1.cloneElement(endIcon, {
                ml: "0.5rem",
            })}
      </>
    </StyledButton_1.default>);
};
Button.defaultProps = {
    isLoading: false,
    external: false,
    variant: types_1.variants.PRIMARY,
    scale: types_1.scales.MD,
    disabled: false,
};
exports.default = Button;
