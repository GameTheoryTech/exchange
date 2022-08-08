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
var styled_components_1 = require("styled-components");
var Heading_1 = require("../../components/Heading/Heading");
var getThemeValue_1 = require("../../util/getThemeValue");
var styles_1 = require("./styles");
var Modal = function (_a) {
    var title = _a.title, onDismiss = _a.onDismiss, onBack = _a.onBack, children = _a.children, _b = _a.hideCloseButton, hideCloseButton = _b === void 0 ? false : _b, _c = _a.bodyPadding, bodyPadding = _c === void 0 ? "24px" : _c, _d = _a.headerBackground, headerBackground = _d === void 0 ? "transparent" : _d, _e = _a.minWidth, minWidth = _e === void 0 ? "320px" : _e, props = __rest(_a, ["title", "onDismiss", "onBack", "children", "hideCloseButton", "bodyPadding", "headerBackground", "minWidth"]);
    var theme = styled_components_1.useTheme();
    return (<styles_1.ModalContainer minWidth={minWidth} {...props}>
      <styles_1.ModalHeader background={getThemeValue_1.default("colors." + headerBackground, headerBackground)(theme)}>
        <styles_1.ModalTitle className="textGlow pink">
          {onBack && <styles_1.ModalBackButton onBack={onBack}/>}
          <Heading_1.default color="var(--accent)">{title}</Heading_1.default>
        </styles_1.ModalTitle>
        {!hideCloseButton && <styles_1.ModalCloseButton onDismiss={onDismiss}/>}
      </styles_1.ModalHeader>
      <styles_1.ModalBody p={bodyPadding}>{children}</styles_1.ModalBody>
    </styles_1.ModalContainer>);
};
exports.default = Modal;
