"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = exports.Default = void 0;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var TabMenu_1 = require("./TabMenu");
var Tab_1 = require("./Tab");
exports.default = {
    title: "Components/Tab Menu",
    component: TabMenu_1.default,
    argTypes: {},
};
var Row = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-bottom: 32px;\n"], ["\n  margin-bottom: 32px;\n"])));
var Default = function () {
    var _a = react_1.useState(0), index = _a[0], setIndex = _a[1];
    var _b = react_1.useState(0), index2 = _b[0], setIndex2 = _b[1];
    var _c = react_1.useState(0), index3 = _c[0], setIndex3 = _c[1];
    var handleClick = function (newIndex) { return setIndex(newIndex); };
    var handleClick2 = function (newIndex) { return setIndex2(newIndex); };
    var handleClick3 = function (newIndex) { return setIndex3(newIndex); };
    return (<>
      <Row>
        <TabMenu_1.default activeIndex={index} onItemClick={handleClick}>
          <Tab_1.default>Total</Tab_1.default>
          <Tab_1.default>Cakers</Tab_1.default>
          <Tab_1.default>Flippers</Tab_1.default>
          <Tab_1.default>Storm</Tab_1.default>
        </TabMenu_1.default>
      </Row>
      <Row>
        <TabMenu_1.default activeIndex={index2} onItemClick={handleClick2}>
          <Tab_1.default>#1 Team</Tab_1.default>
          <Tab_1.default>#2 Team</Tab_1.default>
          <Tab_1.default>#3 Team</Tab_1.default>
        </TabMenu_1.default>
      </Row>
      <Row>
        <TabMenu_1.default activeIndex={index3} onItemClick={handleClick3}>
          <Tab_1.default>Really long tab name</Tab_1.default>
          <Tab_1.default>Short</Tab_1.default>
          <Tab_1.default>Medium length</Tab_1.default>
        </TabMenu_1.default>
      </Row>
    </>);
};
exports.Default = Default;
var Tabs = function () {
    return (<>
      <Row>
        <Tab_1.default>Default</Tab_1.default>
        <Tab_1.default color="primary" backgroundColor="secondary">
          Custom colors
        </Tab_1.default>
      </Row>
      <Row>
        <Tab_1.default scale="md">Small scale (md)</Tab_1.default>
        <Tab_1.default scale="lg">Large scale (lg)</Tab_1.default>
      </Row>
    </>);
};
exports.Tabs = Tabs;
var templateObject_1;
