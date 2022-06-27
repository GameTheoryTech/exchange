"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icons = exports.Default = void 0;
var react_1 = require("react");
var Box_1 = require("../Box/Box");
var Flex_1 = require("../Box/Flex");
var Text_1 = require("../Text/Text");
var Svg_1 = require("./Svg");
exports.default = {
    title: "Components/Svg Icons",
    component: Svg_1.default,
    argTypes: {},
};
var Default = function () {
    return (<div>
      <Svg_1.default viewBox="0 0 18 13">
        <path d="M6 10.2001L2.5 6.70007C2.11 6.31007 1.49 6.31007 1.1 6.70007C0.709995 7.09007 0.709995 7.71007 1.1 8.10007L5.29 12.2901C5.68 12.6801 6.31 12.6801 6.7 12.2901L17.3 1.70007C17.69 1.31007 17.69 0.690068 17.3 0.300068C16.91 -0.0899316 16.29 -0.0899316 15.9 0.300068L6 10.2001Z"/>
      </Svg_1.default>
      <Svg_1.default color="red" viewBox="0 0 18 13">
        <path d="M6 10.2001L2.5 6.70007C2.11 6.31007 1.49 6.31007 1.1 6.70007C0.709995 7.09007 0.709995 7.71007 1.1 8.10007L5.29 12.2901C5.68 12.6801 6.31 12.6801 6.7 12.2901L17.3 1.70007C17.69 1.31007 17.69 0.690068 17.3 0.300068C16.91 -0.0899316 16.29 -0.0899316 15.9 0.300068L6 10.2001Z"/>
      </Svg_1.default>
      <Svg_1.default color="primary" width="50px" viewBox="0 0 18 13">
        <path d="M6 10.2001L2.5 6.70007C2.11 6.31007 1.49 6.31007 1.1 6.70007C0.709995 7.09007 0.709995 7.71007 1.1 8.10007L5.29 12.2901C5.68 12.6801 6.31 12.6801 6.7 12.2901L17.3 1.70007C17.69 1.31007 17.69 0.690068 17.3 0.300068C16.91 -0.0899316 16.29 -0.0899316 15.9 0.300068L6 10.2001Z"/>
      </Svg_1.default>
    </div>);
};
exports.Default = Default;
var context = require.context("./Icons", true, /.tsx$/);
var components = context.keys().reduce(function (accum, path) {
    var _a;
    var file = path.substring(2).replace(".tsx", "");
    return __assign(__assign({}, accum), (_a = {}, _a[file] = context(path), _a));
}, {});
var Icons = function () {
    return (<Flex_1.default justifyContent="start" alignItems="center" flexWrap="wrap">
      {Object.keys(components).map(function (file) {
            var Icon = components[file].default;
            return (<Flex_1.default key={file} flexDirection="column" alignItems="center" width="128px" style={{ border: "1px solid #eee" }} justifyContent="center" py="8px" m="4px">
            <Flex_1.default alignItems="center" justifyContent="center" style={{ flex: 1 }} height="100%">
              <Icon width="48px"/>
              <Icon width="24px" color="secondary" ml="4px"/>
            </Flex_1.default>
            <Box_1.default py="4px">
              <Text_1.default color="textSubtle" fontSize="14px">
                {file}
              </Text_1.default>
            </Box_1.default>
          </Flex_1.default>);
        })}
    </Flex_1.default>);
};
exports.Icons = Icons;
