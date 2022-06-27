"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Button_1 = require("../../components/Button/Button");
var Text_1 = require("../../components/Text/Text");
var config_1 = require("./config");
var WalletCard = function (_a) {
    var login = _a.login, walletConfig = _a.walletConfig, onDismiss = _a.onDismiss, mb = _a.mb;
    var title = walletConfig.title, Icon = walletConfig.icon;
    return (<Button_1.default width="100%" variant="tertiary" onClick={function () {
            login(walletConfig.connectorId);
            window.localStorage.setItem(config_1.connectorLocalStorageKey, walletConfig.connectorId);
            onDismiss();
        }} style={{ justifyContent: "space-between" }} mb={mb} id={"wallet-connect-" + title.toLocaleLowerCase()}>
      <Text_1.default bold color="primary" mr="16px">
        {title}
      </Text_1.default>
      <Icon width="32px"/>
    </Button_1.default>);
};
exports.default = WalletCard;
