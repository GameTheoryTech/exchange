"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Overlay_1 = require("../../components/Overlay/Overlay");
var ModalWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: ", ";\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.zIndices.modal - 1;
});
exports.Context = react_1.createContext({
    isOpen: false,
    nodeId: "",
    modalNode: null,
    setModalNode: function () { return null; },
    onPresent: function () { return null; },
    onDismiss: function () { return null; },
    setCloseOnOverlayClick: function () { return true; },
});
var ModalProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var _c = react_1.useState(), modalNode = _c[0], setModalNode = _c[1];
    var _d = react_1.useState(""), nodeId = _d[0], setNodeId = _d[1];
    var _e = react_1.useState(true), closeOnOverlayClick = _e[0], setCloseOnOverlayClick = _e[1];
    var handlePresent = function (node, newNodeId) {
        setModalNode(node);
        setIsOpen(true);
        setNodeId(newNodeId);
    };
    var handleDismiss = function () {
        setModalNode(undefined);
        setIsOpen(false);
        setNodeId("");
    };
    var handleOverlayDismiss = function () {
        if (closeOnOverlayClick) {
            handleDismiss();
        }
    };
    return (<exports.Context.Provider value={{
            isOpen: isOpen,
            nodeId: nodeId,
            modalNode: modalNode,
            setModalNode: setModalNode,
            onPresent: handlePresent,
            onDismiss: handleDismiss,
            setCloseOnOverlayClick: setCloseOnOverlayClick,
        }}>
      {isOpen && (<ModalWrapper>
          <Overlay_1.default show onClick={handleOverlayDismiss}/>
          {react_1.default.isValidElement(modalNode) &&
                react_1.default.cloneElement(modalNode, {
                    onDismiss: handleDismiss,
                })}
        </ModalWrapper>)}
      {children}
    </exports.Context.Provider>);
};
exports.default = ModalProvider;
var templateObject_1;
