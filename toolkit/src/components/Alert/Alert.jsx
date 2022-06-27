"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var CheckmarkCircle_1 = require("../Svg/Icons/CheckmarkCircle");
var Error_1 = require("../Svg/Icons/Error");
var Block_1 = require("../Svg/Icons/Block");
var Info_1 = require("../Svg/Icons/Info");
var Text_1 = require("../Text");
var Button_1 = require("../Button");
var Svg_1 = require("../Svg");
var Flex_1 = require("../Box/Flex");
var types_1 = require("./types");
var getThemeColor = function (_a) {
    var theme = _a.theme, _b = _a.variant, variant = _b === void 0 ? types_1.variants.INFO : _b;
    switch (variant) {
        case types_1.variants.DANGER:
            return theme.colors.failure;
        case types_1.variants.WARNING:
            return theme.colors.warning;
        case types_1.variants.SUCCESS:
            return theme.colors.success;
        case types_1.variants.INFO:
        default:
            return theme.colors.secondary;
    }
};
var getIcon = function (variant) {
    if (variant === void 0) { variant = types_1.variants.INFO; }
    switch (variant) {
        case types_1.variants.DANGER:
            return Block_1.default;
        case types_1.variants.WARNING:
            return Error_1.default;
        case types_1.variants.SUCCESS:
            return CheckmarkCircle_1.default;
        case types_1.variants.INFO:
        default:
            return Info_1.default;
    }
};
var IconLabel = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: ", ";\n  border-radius: 16px 0 0 16px;\n  color: ", ";\n  padding: 12px;\n"], ["\n  background-color: ", ";\n  border-radius: 16px 0 0 16px;\n  color: ", ";\n  padding: 12px;\n"])), getThemeColor, function (_a) {
    var theme = _a.theme;
    return theme.alert.background;
});
var withHandlerSpacing = 32 + 12 + 8; // button size + inner spacing + handler position
var Details = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  flex: 1;\n  padding-bottom: 12px;\n  padding-left: 12px;\n  padding-right: ", ";\n  padding-top: 12px;\n"], ["\n  flex: 1;\n  padding-bottom: 12px;\n  padding-left: 12px;\n  padding-right: ", ";\n  padding-top: 12px;\n"])), function (_a) {
    var hasHandler = _a.hasHandler;
    return (hasHandler ? withHandlerSpacing + "px" : "12px");
});
var CloseHandler = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  border-radius: 0 16px 16px 0;\n  right: 8px;\n  position: absolute;\n  top: 8px;\n"], ["\n  border-radius: 0 16px 16px 0;\n  right: 8px;\n  position: absolute;\n  top: 8px;\n"])));
var StyledAlert = styled_components_1.default(Flex_1.default)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  position: relative;\n  background-color: ", ";\n  border-radius: 16px;\n  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);\n"], ["\n  position: relative;\n  background-color: ", ";\n  border-radius: 16px;\n  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);\n"])), function (_a) {
    var theme = _a.theme;
    return theme.alert.background;
});
var Alert = function (_a) {
    var title = _a.title, children = _a.children, variant = _a.variant, onClick = _a.onClick;
    var Icon = getIcon(variant);
    return (<StyledAlert>
      <IconLabel variant={variant} hasDescription={!!children}>
        <Icon color="currentColor" width="24px"/>
      </IconLabel>
      <Details hasHandler={!!onClick}>
        <Text_1.Text bold>{title}</Text_1.Text>
        {typeof children === "string" ? <Text_1.Text as="p">{children}</Text_1.Text> : children}
      </Details>
      {onClick && (<CloseHandler>
          <Button_1.IconButton scale="sm" variant="text" onClick={onClick}>
            <Svg_1.CloseIcon width="24px" color="currentColor"/>
          </Button_1.IconButton>
        </CloseHandler>)}
    </StyledAlert>);
};
exports.default = Alert;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
