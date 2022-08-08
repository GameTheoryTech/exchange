"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Button_1 = require("../../../components/Button/Button");
var WalletModal_1 = require("../../WalletModal");
var icons_1 = require("../icons");
var styled_components_1 = require("styled-components");
var StyledButton = styled_components_1.default(Button_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  span {\n    margin-left: 10px;\n  }\n\n  svg {\n    position: relative;\n    top: -2.5px;\n    height: 24px;\n  }\n\n  @media (max-width: 767px) {\n    padding: 10px 0;\n    min-width: 64px;\n\n    span {\n      display: none;\n    }\n  }\n"], ["\n  span {\n    margin-left: 10px;\n  }\n\n  svg {\n    position: relative;\n    top: -2.5px;\n    height: 24px;\n  }\n\n  @media (max-width: 767px) {\n    padding: 10px 0;\n    min-width: 64px;\n\n    span {\n      display: none;\n    }\n  }\n"])));
var UserBlock = function (_a) {
    var account = _a.account, login = _a.login, logout = _a.logout;
    var _b = WalletModal_1.useWalletModal(login, logout, account), onPresentConnectModal = _b.onPresentConnectModal, onPresentAccountModal = _b.onPresentAccountModal;
    var accountEllipsis = account ? account.substring(0, 4) + "..." + account.substring(account.length - 4) : null;
    return (<div>
      {account ? (<StyledButton scale="sm" onClick={function () {
                onPresentAccountModal();
            }}>
          <icons_1.WalletIcon />
          <span>{accountEllipsis}</span>
        </StyledButton>) : (<StyledButton scale="sm" onClick={function () {
                onPresentConnectModal();
            }}>
          <icons_1.WalletIcon />
          <span>Connect</span>
        </StyledButton>)}
    </div>);
};
exports.default = react_1.default.memo(UserBlock, function (prevProps, nextProps) {
    return prevProps.account === nextProps.account &&
        prevProps.login === nextProps.login &&
        prevProps.logout === nextProps.logout;
});
var templateObject_1;
