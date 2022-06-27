"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Text_1 = require("../../../components/Text/Text");
var Flex_1 = require("../../../components/Box/Flex");
var Button_1 = require("../../../components/Button/Button");
var IconModule = require("../icons");
var Icons = IconModule;
var MoonIcon = Icons.MoonIcon, SunIcon = Icons.SunIcon;
var ThemeSwitcher = function (_a) {
    var isDark = _a.isDark, toggleTheme = _a.toggleTheme;
    return (<Button_1.default variant="text" onClick={function () { return toggleTheme(!isDark); }}>
    {/* alignItems center is a Safari fix */}
    <Flex_1.default alignItems="center">
      <SunIcon color={isDark ? "textDisabled" : "text"} width="24px"/>
      <Text_1.default color="textDisabled" mx="4px">
        /
      </Text_1.default>
      <MoonIcon color={isDark ? "text" : "textDisabled"} width="24px"/>
    </Flex_1.default>
  </Button_1.default>);
};
exports.default = react_1.default.memo(ThemeSwitcher, function (prev, next) { return prev.isDark === next.isDark; });
