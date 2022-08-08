var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from "react";
import styled from "styled-components";
import Flex from "../../components/Box/Flex";
import { Box } from "../../components/Box";
import { ArrowBackIcon, CloseIcon } from "../../components/Svg";
import { IconButton } from "../../components/Button";
export var ModalHeader = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n\n  button {\n    position: absolute;\n    right: 20px;\n    font-size: 35px;\n\n    svg {\n      width: 1em;\n      height: 1em;\n      filter: drop-shadow(0 0 5px var(--accent));\n    }\n  }\n"], ["\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n\n  button {\n    position: absolute;\n    right: 20px;\n    font-size: 35px;\n\n    svg {\n      width: 1em;\n      height: 1em;\n      filter: drop-shadow(0 0 5px var(--accent));\n    }\n  }\n"])));
export var ModalTitle = styled(Flex)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\n"], ["\n\n"])));
export var ModalBody = styled(Flex)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  flex-direction: column;\n  max-height: 90vh;\n  overflow-y: auto;\n"], ["\n  flex-direction: column;\n  max-height: 90vh;\n  overflow-y: auto;\n"])));
export var ModalCloseButton = function (_a) {
    var onDismiss = _a.onDismiss;
    return (React.createElement(IconButton, { variant: "text", onClick: onDismiss, "aria-label": "Close the dialog" },
        React.createElement(CloseIcon, { color: "primary" })));
};
export var ModalBackButton = function (_a) {
    var onBack = _a.onBack;
    return (React.createElement(IconButton, { variant: "text", onClick: onBack, "area-label": "go back", mr: "8px" },
        React.createElement(ArrowBackIcon, { color: "primary" })));
};
export var ModalContainer = styled(Box)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  overflow: hidden;\n  background: #212e4d;\n  border-radius: 20px;\n  width: 100%;\n  max-height: 100vh;\n  min-width: 500px;\n  max-width: 500px;\n  z-index: ", ";\n\n  @media (max-width: 500px) {\n    min-width: 100%;\n  }\n"], ["\n  overflow: hidden;\n  background: #212e4d;\n  border-radius: 20px;\n  width: 100%;\n  max-height: 100vh;\n  min-width: 500px;\n  max-width: 500px;\n  z-index: ", ";\n\n  @media (max-width: 500px) {\n    min-width: 100%;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.zIndices.modal;
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
