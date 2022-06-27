"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModal = exports.ModalProvider = exports.Modal = void 0;
var Modal_1 = require("./Modal");
Object.defineProperty(exports, "Modal", { enumerable: true, get: function () { return Modal_1.default; } });
var ModalContext_1 = require("./ModalContext");
Object.defineProperty(exports, "ModalProvider", { enumerable: true, get: function () { return ModalContext_1.default; } });
var useModal_1 = require("./useModal");
Object.defineProperty(exports, "useModal", { enumerable: true, get: function () { return useModal_1.default; } });
__exportStar(require("./styles"), exports);
