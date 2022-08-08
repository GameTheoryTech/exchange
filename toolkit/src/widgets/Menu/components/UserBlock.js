var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from "react";
import Button from "../../../components/Button/Button";
import { useWalletModal } from "../../WalletModal";
import { WalletIcon } from "../icons";
import styled from "styled-components";
var StyledButton = styled(Button)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  span {\n    margin-left: 10px;\n  }\n\n  svg {\n    position: relative;\n    top: -2.5px;\n    height: 24px;\n  }\n\n  @media (max-width: 767px) {\n    padding: 10px 0;\n    min-width: 64px;\n\n    span {\n      display: none;\n    }\n  }\n"], ["\n  span {\n    margin-left: 10px;\n  }\n\n  svg {\n    position: relative;\n    top: -2.5px;\n    height: 24px;\n  }\n\n  @media (max-width: 767px) {\n    padding: 10px 0;\n    min-width: 64px;\n\n    span {\n      display: none;\n    }\n  }\n"])));
var UserBlock = function (_a) {
    var account = _a.account, login = _a.login, logout = _a.logout;
    var _b = useWalletModal(login, logout, account), onPresentConnectModal = _b.onPresentConnectModal, onPresentAccountModal = _b.onPresentAccountModal;
    var accountEllipsis = account ? account.substring(0, 4) + "..." + account.substring(account.length - 4) : null;
    return (React.createElement("div", null, account ? (React.createElement(StyledButton, { scale: "sm", onClick: function () {
            onPresentAccountModal();
        } },
        React.createElement(WalletIcon, null),
        React.createElement("span", null, accountEllipsis))) : (React.createElement(StyledButton, { scale: "sm", onClick: function () {
            onPresentConnectModal();
        } },
        React.createElement(WalletIcon, null),
        React.createElement("span", null, "Connect")))));
};
export default React.memo(UserBlock, function (prevProps, nextProps) {
    return prevProps.account === nextProps.account &&
        prevProps.login === nextProps.login &&
        prevProps.logout === nextProps.logout;
});
var templateObject_1;
