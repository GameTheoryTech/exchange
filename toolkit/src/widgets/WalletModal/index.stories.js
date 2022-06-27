"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
var react_1 = require("react");
var Button_1 = require("../../components/Button/Button");
var Flex_1 = require("../../components/Box/Flex");
var useWalletModal_1 = require("./useWalletModal");
exports.default = {
    title: "Widgets/WalletModal",
    argTypes: {},
};
var Wallet = function () {
    var _a = (0, useWalletModal_1.default)(function () { return null; }, function () { return null; }, "0xbdda50183d817c3289f895a4472eb475967dc980"), onPresentConnectModal = _a.onPresentConnectModal, onPresentAccountModal = _a.onPresentAccountModal;
    return (React.createElement(Flex_1.default, null,
        React.createElement(Button_1.default, { onClick: onPresentConnectModal }, "Open connect modal"),
        React.createElement(Button_1.default, { onClick: onPresentAccountModal }, "Open account modal")));
};
exports.Wallet = Wallet;
