"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSeparator = exports.Default = void 0;
var react_1 = require("react");
var Text_1 = require("../Text/Text");
var Link_1 = require("../Link/Link");
var Logo_1 = require("../Svg/Icons/Logo");
var PresentWon_1 = require("../Svg/Icons/PresentWon");
var Breadcrumbs_1 = require("./Breadcrumbs");
exports.default = {
    title: "Components/Breadcrumbs",
    component: Breadcrumbs_1.default,
    argTypes: {},
};
var Default = function () {
    return (<Text_1.default p="32px">
      <Breadcrumbs_1.default mb="32px">
        <Link_1.default href="/" color="secondary" style={{ fontWeight: 400 }}>
          Link
        </Link_1.default>
        <Text_1.default color="textDisabled">Crumb 1</Text_1.default>
        <Text_1.default color="textDisabled">Crumb 2</Text_1.default>
      </Breadcrumbs_1.default>
      <Breadcrumbs_1.default>
        <Text_1.default>PancakeSwap</Text_1.default>
        <Text_1.default>The #1 AMM and yield farm on Binance Smart Chain.</Text_1.default>
      </Breadcrumbs_1.default>
    </Text_1.default>);
};
exports.Default = Default;
var CustomSeparator = function () {
    return (<Text_1.default p="32px">
      <Text_1.default mb="16px">
        <Breadcrumbs_1.default separator={<Logo_1.default width="24px"/>}>
          <Link_1.default href="/" color="secondary" style={{ fontWeight: 400 }}>
            Link
          </Link_1.default>
          <Text_1.default color="textDisabled">Crumb 1</Text_1.default>
          <Text_1.default color="textDisabled">Crumb 2</Text_1.default>
        </Breadcrumbs_1.default>
      </Text_1.default>
      <Text_1.default mb="16px">
        <Breadcrumbs_1.default separator={<PresentWon_1.default width="48px"/>}>
          <Link_1.default href="/" color="failure" style={{ fontWeight: 400 }}>
            Link
          </Link_1.default>
          <Link_1.default href="/" color="primary" style={{ fontWeight: 400 }}>
            Link 2
          </Link_1.default>
          <Text_1.default color="textDisabled">Crumb 2</Text_1.default>
        </Breadcrumbs_1.default>
      </Text_1.default>
    </Text_1.default>);
};
exports.CustomSeparator = CustomSeparator;
