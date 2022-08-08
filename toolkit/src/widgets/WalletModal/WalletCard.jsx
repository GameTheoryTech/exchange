"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Button_1 = require("../../components/Button/Button");
var Text_1 = require("../../components/Text/Text");
var config_1 = require("./config");
var styled_components_1 = require("styled-components");
var StyledButton = styled_components_1.default(Button_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: transparent;\n  color: var(--accent);\n  border: 2px solid var(--accent);\n  box-shadow: none;\n  text-shadow: none;\n  margin-bottom: 20px;\n\n  &:last-child {\n    margin-bottom: 0;\n  }\n\n  svg {\n    transition: all .25s cubic-bezier(.4,0,.2,1);\n  }\n\n  &:hover {\n    background-color: transparent!important;\n    box-shadow: 0px 0px 20px 0px var(--accent)!important;\n    text-shadow: rgb(255 255 255) 0px 0px 20px!important;\n\n    svg {\n      filter: drop-shadow(0 0 20px #fff);\n    }\n  }\n"], ["\n  background-color: transparent;\n  color: var(--accent);\n  border: 2px solid var(--accent);\n  box-shadow: none;\n  text-shadow: none;\n  margin-bottom: 20px;\n\n  &:last-child {\n    margin-bottom: 0;\n  }\n\n  svg {\n    transition: all .25s cubic-bezier(.4,0,.2,1);\n  }\n\n  &:hover {\n    background-color: transparent!important;\n    box-shadow: 0px 0px 20px 0px var(--accent)!important;\n    text-shadow: rgb(255 255 255) 0px 0px 20px!important;\n\n    svg {\n      filter: drop-shadow(0 0 20px #fff);\n    }\n  }\n"])));
var WalletCard = function (_a) {
    var login = _a.login, walletConfig = _a.walletConfig, onDismiss = _a.onDismiss, mb = _a.mb;
    var title = walletConfig.title, Icon = walletConfig.icon;
    return (<StyledButton width="100%" variant="primary" onClick={function () {
            login(walletConfig.connectorId);
            window.localStorage.setItem(config_1.connectorLocalStorageKey, walletConfig.connectorId);
            onDismiss();
        }} style={{ justifyContent: "space-between" }} mb={mb} id={"wallet-connect-" + title.toLocaleLowerCase()}>
      <Text_1.default>
        {title}
      </Text_1.default>
      <Icon width="32px"/>
    </StyledButton>);
};
exports.default = WalletCard;
var templateObject_1;
