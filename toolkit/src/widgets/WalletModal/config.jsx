"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectorLocalStorageKey = void 0;
var Metamask_1 = require("./icons/Metamask");
var WalletConnect_1 = require("./icons/WalletConnect");
var types_1 = require("./types");
var connectors = [
    {
        title: "Metamask",
        icon: Metamask_1.default,
        connectorId: types_1.ConnectorNames.Injected,
    },
    // {
    //   title: "TrustWallet",
    //   icon: TrustWallet,
    //   connectorId: ConnectorNames.Injected,
    // },
    // {
    //   title: "MathWallet",
    //   icon: MathWallet,
    //   connectorId: ConnectorNames.Injected,
    // },
    // {
    //   title: "TokenPocket",
    //   icon: TokenPocket,
    //   connectorId: ConnectorNames.Injected,
    // },
    {
        title: "WalletConnect",
        icon: WalletConnect_1.default,
        connectorId: types_1.ConnectorNames.WalletConnect,
    },
    // {
    //   title: "Binance Chain Wallet",
    //   icon: BinanceChain,
    //   connectorId: ConnectorNames.BSC,
    // },
    // {
    //   title: "SafePal Wallet",
    //   icon: SafePalWallet,
    //   connectorId: ConnectorNames.Injected,
    // },
    // {
    //   title: "Coin98 Wallet",
    //   icon: Coin98Wallet,
    //   connectorId: ConnectorNames.Injected,
    // },
];
exports.default = connectors;
exports.connectorLocalStorageKey = "connectorId";
