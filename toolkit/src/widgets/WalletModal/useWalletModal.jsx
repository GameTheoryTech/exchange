"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Modal_1 = require("../Modal");
var ConnectModal_1 = require("./ConnectModal");
var AccountModal_1 = require("./AccountModal");
var useWalletModal = function (login, logout, account) {
    var onPresentConnectModal = Modal_1.useModal(<ConnectModal_1.default login={login}/>)[0];
    var onPresentAccountModal = Modal_1.useModal(<AccountModal_1.default account={account || ""} logout={logout}/>)[0];
    return { onPresentConnectModal: onPresentConnectModal, onPresentAccountModal: onPresentAccountModal };
};
exports.default = useWalletModal;
