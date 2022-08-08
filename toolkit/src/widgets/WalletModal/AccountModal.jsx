"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Button_1 = require("../../components/Button/Button");
var Text_1 = require("../../components/Text/Text");
var LinkExternal_1 = require("../../components/Link/LinkExternal");
var Flex_1 = require("../../components/Box/Flex");
var Modal_1 = require("../Modal");
var CopyToClipboard_1 = require("./CopyToClipboard");
var config_1 = require("./config");
var AccountModal = function (_a) {
    var account = _a.account, logout = _a.logout, _b = _a.onDismiss, onDismiss = _b === void 0 ? function () { return null; } : _b;
    return (<Modal_1.Modal title="Your wallet" onDismiss={onDismiss}>
    <Text_1.default fontSize="20px" bold style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "8px" }}>
      {account}
    </Text_1.default>
    <Flex_1.default mb="32px">
      <LinkExternal_1.default small href={"https://snowtrace.io/address/" + account} mr="16px">
        View on SnowTrace
      </LinkExternal_1.default>
      <CopyToClipboard_1.default toCopy={account}>Copy Address</CopyToClipboard_1.default>
    </Flex_1.default>
    <Flex_1.default justifyContent="center">
      <Button_1.default scale="sm" variant="primary" onClick={function () {
            logout();
            window.localStorage.removeItem(config_1.connectorLocalStorageKey);
            onDismiss();
        }}>
        Logout
      </Button_1.default>
    </Flex_1.default>
  </Modal_1.Modal>);
};
exports.default = AccountModal;
