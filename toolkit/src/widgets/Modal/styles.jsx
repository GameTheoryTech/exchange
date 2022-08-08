"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalContainer = exports.ModalBackButton = exports.ModalCloseButton = exports.ModalBody = exports.ModalTitle = exports.ModalHeader = void 0;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Flex_1 = require("../../components/Box/Flex");
var Box_1 = require("../../components/Box");
var Svg_1 = require("../../components/Svg");
var Button_1 = require("../../components/Button");
exports.ModalHeader = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n\n  button {\n    position: absolute;\n    right: 20px;\n    font-size: 35px;\n\n    svg {\n      width: 1em;\n      height: 1em;\n      filter: drop-shadow(0 0 5px var(--accent));\n    }\n  }\n"], ["\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n\n  button {\n    position: absolute;\n    right: 20px;\n    font-size: 35px;\n\n    svg {\n      width: 1em;\n      height: 1em;\n      filter: drop-shadow(0 0 5px var(--accent));\n    }\n  }\n"])));
exports.ModalTitle = styled_components_1.default(Flex_1.default)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\n"], ["\n\n"])));
exports.ModalBody = styled_components_1.default(Flex_1.default)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  flex-direction: column;\n  max-height: 90vh;\n  overflow-y: auto;\n"], ["\n  flex-direction: column;\n  max-height: 90vh;\n  overflow-y: auto;\n"])));
var ModalCloseButton = function (_a) {
    var onDismiss = _a.onDismiss;
    return (<Button_1.IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog">
      <Svg_1.CloseIcon color="primary"/>
    </Button_1.IconButton>);
};
exports.ModalCloseButton = ModalCloseButton;
var ModalBackButton = function (_a) {
    var onBack = _a.onBack;
    return (<Button_1.IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
      <Svg_1.ArrowBackIcon color="primary"/>
    </Button_1.IconButton>);
};
exports.ModalBackButton = ModalBackButton;
exports.ModalContainer = styled_components_1.default(Box_1.Box)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  overflow: hidden;\n  background: #212e4d;\n  border-radius: 20px;\n  width: 100%;\n  max-height: 100vh;\n  min-width: 500px;\n  max-width: 500px;\n  z-index: ", ";\n\n  @media (max-width: 500px) {\n    min-width: 100%;\n  }\n"], ["\n  overflow: hidden;\n  background: #212e4d;\n  border-radius: 20px;\n  width: 100%;\n  max-height: 100vh;\n  min-width: 500px;\n  max-width: 500px;\n  z-index: ", ";\n\n  @media (max-width: 500px) {\n    min-width: 100%;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.zIndices.modal;
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
