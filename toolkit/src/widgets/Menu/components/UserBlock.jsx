"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Button_1 = require("../../../components/Button/Button");
var WalletModal_1 = require("../../WalletModal");
var UserBlock = function (_a) {
    var account = _a.account, login = _a.login, logout = _a.logout;
    var _b = WalletModal_1.useWalletModal(login, logout, account), onPresentConnectModal = _b.onPresentConnectModal, onPresentAccountModal = _b.onPresentAccountModal;
    var accountEllipsis = account ? account.substring(0, 4) + "..." + account.substring(account.length - 4) : null;
    return (<div>
      {account ? (<Button_1.default scale="sm" variant="tertiary" onClick={function () {
                onPresentAccountModal();
            }}>
          {accountEllipsis}
        </Button_1.default>) : (<Button_1.default scale="sm" onClick={function () {
                onPresentConnectModal();
            }}>
          Connect
        </Button_1.default>)}
    </div>);
};
exports.default = react_1.default.memo(UserBlock, function (prevProps, nextProps) {
    return prevProps.account === nextProps.account &&
        prevProps.login === nextProps.login &&
        prevProps.logout === nextProps.logout;
});
