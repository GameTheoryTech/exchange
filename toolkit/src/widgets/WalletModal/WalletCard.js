var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from "react";
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
import { connectorLocalStorageKey } from "./config";
import styled from "styled-components";
var StyledButton = styled(Button)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: transparent;\n  color: var(--accent);\n  border: 2px solid var(--accent);\n  box-shadow: none;\n  text-shadow: none;\n  margin-bottom: 20px;\n\n  &:last-child {\n    margin-bottom: 0;\n  }\n\n  svg {\n    transition: all .25s cubic-bezier(.4,0,.2,1);\n  }\n\n  &:hover {\n    background-color: transparent!important;\n    box-shadow: 0px 0px 20px 0px var(--accent)!important;\n    text-shadow: rgb(255 255 255) 0px 0px 20px!important;\n\n    svg {\n      filter: drop-shadow(0 0 20px #fff);\n    }\n  }\n"], ["\n  background-color: transparent;\n  color: var(--accent);\n  border: 2px solid var(--accent);\n  box-shadow: none;\n  text-shadow: none;\n  margin-bottom: 20px;\n\n  &:last-child {\n    margin-bottom: 0;\n  }\n\n  svg {\n    transition: all .25s cubic-bezier(.4,0,.2,1);\n  }\n\n  &:hover {\n    background-color: transparent!important;\n    box-shadow: 0px 0px 20px 0px var(--accent)!important;\n    text-shadow: rgb(255 255 255) 0px 0px 20px!important;\n\n    svg {\n      filter: drop-shadow(0 0 20px #fff);\n    }\n  }\n"])));
var WalletCard = function (_a) {
    var login = _a.login, walletConfig = _a.walletConfig, onDismiss = _a.onDismiss, mb = _a.mb;
    var title = walletConfig.title, Icon = walletConfig.icon;
    return (React.createElement(StyledButton, { width: "100%", variant: "primary", onClick: function () {
            login(walletConfig.connectorId);
            window.localStorage.setItem(connectorLocalStorageKey, walletConfig.connectorId);
            onDismiss();
        }, style: { justifyContent: "space-between" }, mb: mb, id: "wallet-connect-" + title.toLocaleLowerCase() },
        React.createElement(Text, null, title),
        React.createElement(Icon, { width: "32px" })));
};
export default WalletCard;
var templateObject_1;
