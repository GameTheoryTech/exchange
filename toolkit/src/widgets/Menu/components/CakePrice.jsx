"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Svg_1 = require("../../../components/Svg");
var Text_1 = require("../../../components/Text/Text");
var Skeleton_1 = require("../../../components/Skeleton/Skeleton");
var PriceLink = styled_components_1.default.a(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  svg {\n    transition: transform 0.3s;\n  }\n  :hover {\n    svg {\n      transform: scale(1.2);\n    }\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  svg {\n    transition: transform 0.3s;\n  }\n  :hover {\n    svg {\n      transform: scale(1.2);\n    }\n  }\n"])));
var CakePrice = function (_a) {
    var cakePriceUsd = _a.cakePriceUsd;
    return cakePriceUsd ? (<PriceLink href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82" target="_blank">
      <Svg_1.PancakeRoundIcon width="24px" mr="8px"/>
      <Text_1.default color="textSubtle" bold>{"$" + cakePriceUsd.toFixed(3)}</Text_1.default>
    </PriceLink>) : (<Skeleton_1.default width={80} height={24}/>);
};
exports.default = react_1.default.memo(CakePrice);
var templateObject_1;
