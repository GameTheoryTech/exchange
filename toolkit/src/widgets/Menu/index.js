"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuConfig = exports.menuStatus = exports.Menu = void 0;
var Menu_1 = require("./Menu");
Object.defineProperty(exports, "Menu", { enumerable: true, get: function () { return Menu_1.default; } });
var config_1 = require("./config");
Object.defineProperty(exports, "menuStatus", { enumerable: true, get: function () { return config_1.status; } });
Object.defineProperty(exports, "menuConfig", { enumerable: true, get: function () { return config_1.links; } });
