"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Svg_1 = require("../../../components/Svg");
var IconButton_1 = require("../../../components/Button/IconButton");
var config_1 = require("../config");
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: none;\n  padding: 8px 4px;\n  background-color: ", ";\n  border-top: solid 2px rgba(133, 133, 133, 0.1);\n"], ["\n  flex: none;\n  padding: 8px 4px;\n  background-color: ", ";\n  border-top: solid 2px rgba(133, 133, 133, 0.1);\n"])), function (_a) {
    var theme = _a.theme;
    return theme.nav.background;
});
var SettingsEntry = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: ", "px;\n  padding: 0 8px;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: ", "px;\n  padding: 0 8px;\n"])), config_1.MENU_ENTRY_HEIGHT);
var SocialEntry = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: ", "px;\n  padding: 0 16px;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: ", "px;\n  padding: 0 16px;\n"])), config_1.MENU_ENTRY_HEIGHT);
var PanelFooter = function (_a) {
    var isPushed = _a.isPushed, pushNav = _a.pushNav, toggleTheme = _a.toggleTheme, isDark = _a.isDark, cakePriceUsd = _a.cakePriceUsd, currentLang = _a.currentLang, langs = _a.langs, setLang = _a.setLang;
    if (!isPushed) {
        return (<Container>
        <IconButton_1.default variant="text" onClick={function () { return pushNav(true); }}>
          <Svg_1.CogIcon />
        </IconButton_1.default>
      </Container>);
    }
    return (<Container>
      {/*<SocialEntry>*/}
      {/*  <CakePrice cakePriceUsd={cakePriceUsd} />*/}
      {/*  <SocialLinks />*/}
      {/*</SocialEntry>*/}
      <SettingsEntry>
        {/*<ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />*/}
        {/*<LangSelector currentLang={currentLang} langs={langs} setLang={setLang} />*/}
      </SettingsEntry>
    </Container>);
};
exports.default = PanelFooter;
var templateObject_1, templateObject_2, templateObject_3;
