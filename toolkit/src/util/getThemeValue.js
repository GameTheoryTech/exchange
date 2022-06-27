"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_1 = require("lodash/get");
var getThemeValue = function (path, fallback) {
    return function (theme) {
        return get_1.default(theme, path, fallback);
    };
};
exports.default = getThemeValue;
