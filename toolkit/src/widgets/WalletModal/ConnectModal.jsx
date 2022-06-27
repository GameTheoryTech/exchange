"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Link_1 = require("../../components/Link");
var Svg_1 = require("../../components/Svg");
var Modal_1 = require("../Modal");
var WalletCard_1 = require("./WalletCard");
var config_1 = require("./config");
var HelpLink = styled_components_1.default(Link_1.Link)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-self: center;\n  align-items: center;\n  margin-top: 24px;\n"], ["\n  display: flex;\n  align-self: center;\n  align-items: center;\n  margin-top: 24px;\n"])));
var ConnectModal = function (_a) {
    var login = _a.login, _b = _a.onDismiss, onDismiss = _b === void 0 ? function () { return null; } : _b;
    return (<Modal_1.Modal title="Connect to a wallet" onDismiss={onDismiss}>
    {config_1.default.map(function (entry, index) { return (<WalletCard_1.default key={entry.title} login={login} walletConfig={entry} onDismiss={onDismiss} mb={index < config_1.default.length - 1 ? "8px" : "0"}/>); })}
    <HelpLink href="https://docs.pancakeswap.finance/get-started/connection-guide" external>
      <Svg_1.HelpIcon color="primary" mr="6px"/>
      Learn how to connect
    </HelpLink>
  </Modal_1.Modal>);
};
exports.default = ConnectModal;
var templateObject_1;
