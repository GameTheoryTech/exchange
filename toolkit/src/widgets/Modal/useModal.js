"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var get_1 = require("lodash/get");
var ModalContext_1 = require("./ModalContext");
var useModal = function (modal, closeOnOverlayClick, updateOnPropsChange, modalId) {
    if (closeOnOverlayClick === void 0) { closeOnOverlayClick = true; }
    if (updateOnPropsChange === void 0) { updateOnPropsChange = false; }
    if (modalId === void 0) { modalId = "defaultNodeId"; }
    var _a = react_1.useContext(ModalContext_1.Context), isOpen = _a.isOpen, nodeId = _a.nodeId, modalNode = _a.modalNode, setModalNode = _a.setModalNode, onPresent = _a.onPresent, onDismiss = _a.onDismiss, setCloseOnOverlayClick = _a.setCloseOnOverlayClick;
    var onPresentCallback = react_1.useCallback(function () {
        onPresent(modal, modalId);
    }, [modal, modalId, onPresent]);
    // Updates the "modal" component if props are changed
    // Use carefully since it might result in unnecessary rerenders
    // Typically if modal is staic there is no need for updates, use when you expect props to change
    react_1.useEffect(function () {
        // NodeId is needed in case there are 2 useModal hooks on the same page and one has updateOnPropsChange
        if (updateOnPropsChange && isOpen && nodeId === modalId) {
            var modalProps = get_1.default(modal, "props");
            var oldModalProps = get_1.default(modalNode, "props");
            // Note: I tried to use lodash isEqual to compare props but it is giving false-negatives too easily
            // For example ConfirmSwapModal in exchange has ~500 lines prop object that stringifies to same string
            // and online diff checker says both objects are identical but lodash isEqual thinks they are different
            // Do not try to replace JSON.stringify with isEqual, high risk of infinite rerenders
            // TODO: Find a good way to handle modal updates, this whole flow is just backwards-compatible workaround,
            // would be great to simplify the logic here
            if (modalProps && oldModalProps && JSON.stringify(modalProps) !== JSON.stringify(oldModalProps)) {
                setModalNode(modal);
            }
        }
    }, [updateOnPropsChange, nodeId, modalId, isOpen, modal, modalNode, setModalNode]);
    react_1.useEffect(function () {
        setCloseOnOverlayClick(closeOnOverlayClick);
    }, [closeOnOverlayClick, setCloseOnOverlayClick]);
    return [onPresentCallback, onDismiss];
};
exports.default = useModal;
