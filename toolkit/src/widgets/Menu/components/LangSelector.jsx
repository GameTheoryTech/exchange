"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Text_1 = require("../../../components/Text/Text");
var Dropdown_1 = require("../../../components/Dropdown/Dropdown");
var Button_1 = require("../../../components/Button/Button");
var Language_1 = require("../../../components/Svg/Icons/Language");
var MenuButton_1 = require("./MenuButton");
var LangSelector = function (_a) {
    var currentLang = _a.currentLang, langs = _a.langs, setLang = _a.setLang;
    return (<Dropdown_1.default position="top-right" target={<Button_1.default variant="text" startIcon={<Language_1.default color="textSubtle" width="24px"/>}>
        <Text_1.default color="textSubtle">{currentLang === null || currentLang === void 0 ? void 0 : currentLang.toUpperCase()}</Text_1.default>
      </Button_1.default>}>
    {langs.map(function (lang) { return (<MenuButton_1.default key={lang.code} fullWidth onClick={function () { return setLang(lang); }} 
        // Safari fix
        style={{ minHeight: "32px", height: "auto" }}>
        {lang.language}
      </MenuButton_1.default>); })}
  </Dropdown_1.default>);
};
exports.default = react_1.default.memo(LangSelector, function (prev, next) { return prev.currentLang === next.currentLang; });
