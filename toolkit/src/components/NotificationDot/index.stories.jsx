"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuButtons = exports.Default = void 0;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var NotificationDot_1 = require("./NotificationDot");
var Button_1 = require("../Button/Button");
var ButtonMenu_1 = require("../ButtonMenu/ButtonMenu");
var ButtonMenuItem_1 = require("../ButtonMenu/ButtonMenuItem");
exports.default = {
    title: "Components/NotificationDot",
    component: NotificationDot_1.default,
    argTypes: {},
};
var Default = function () {
    return (<NotificationDot_1.default show>
      <Button_1.default>Hi</Button_1.default>
    </NotificationDot_1.default>);
};
exports.Default = Default;
var Row = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  & > * + * {\n    margin-left: 16px;\n  }\n"], ["\n  & > * + * {\n    margin-left: 16px;\n  }\n"])));
var MenuButtons = function () {
    var _a = react_1.useState(0), index = _a[0], setIndex = _a[1];
    var handleClick = function (newIndex) { return setIndex(newIndex); };
    return (<Row>
      <ButtonMenu_1.default activeIndex={index} onItemClick={handleClick}>
        <NotificationDot_1.default show={index === 0}>
          <ButtonMenuItem_1.default>Button 1</ButtonMenuItem_1.default>
        </NotificationDot_1.default>
        <NotificationDot_1.default show={index === 1}>
          <ButtonMenuItem_1.default>Button 2</ButtonMenuItem_1.default>
        </NotificationDot_1.default>
        <NotificationDot_1.default show={index === 2}>
          <ButtonMenuItem_1.default>Button 3</ButtonMenuItem_1.default>
        </NotificationDot_1.default>
        <NotificationDot_1.default show={index === 3}>
          <ButtonMenuItem_1.default>Button 4</ButtonMenuItem_1.default>
        </NotificationDot_1.default>
      </ButtonMenu_1.default>
    </Row>);
};
exports.MenuButtons = MenuButtons;
var templateObject_1;
