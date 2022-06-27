"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenPairImages = exports.TokenImages = exports.LazyBackgrounds = exports.LazyImages = exports.Background = exports.Image = void 0;
var react_1 = require("react");
var lodash_1 = require("lodash");
var styled_components_1 = require("styled-components");
var Flex_1 = require("../Box/Flex");
var Box_1 = require("../Box/Box");
var Text_1 = require("../Text/Text");
var BackgroundImage_1 = require("./BackgroundImage");
var Image_1 = require("./Image");
var TokenImage_1 = require("./TokenImage");
var TokenPairImage_1 = require("./TokenPairImage");
var tokens_1 = require("./tokens");
exports.default = {
    title: "Components/Image",
    argTypes: {},
};
var Image = function () {
    return (<div>
      <Image_1.default src="https://via.placeholder.com/800x400" width={800} height={400} alt="test"/>
      <div>Image</div>
    </div>);
};
exports.Image = Image;
var Background = function () {
    return (<div>
      <BackgroundImage_1.default src="https://via.placeholder.com/800x400" width={800} height={400} mr="16px"/>
      <div>Background Image</div>
    </div>);
};
exports.Background = Background;
var LazyImages = function () {
    return (<Flex_1.default flexWrap="wrap">
      {lodash_1.times(40, function (index) { return (<Image_1.default key={index} src={"https://via.placeholder.com/" + (150 + index)} width={150} height={150} mb="16px" mr="16px"/>); })}
    </Flex_1.default>);
};
exports.LazyImages = LazyImages;
var LazyBackgrounds = function () {
    return (<Flex_1.default flexWrap="wrap">
      {lodash_1.times(40, function (index) { return (<BackgroundImage_1.default key={index} src={"https://via.placeholder.com/" + (150 + index)} width={150} height={150} mb="16px" mr="16px"/>); })}
    </Flex_1.default>);
};
exports.LazyBackgrounds = LazyBackgrounds;
var StyledBox = styled_components_1.default(Box_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border: 1px solid ", ";\n  flex-basis: 100px;\n  text-align: center;\n"], ["\n  border: 1px solid ", ";\n  flex-basis: 100px;\n  text-align: center;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.cardBorder;
});
var TokenImages = function () {
    var tokens = Object.values(tokens_1.default).filter(function (token) { return !!(token === null || token === void 0 ? void 0 : token.address); });
    return (<Flex_1.default flexWrap="wrap">
      {tokens.map(function (token) {
            var src = "https://pancakeswap.finance/images/tokens/" + token.address[43114] + ".svg";
            return (<StyledBox key={token.symbol} p="16px">
            <Text_1.default fontSize="14px" color="textSubtle">
              {token.symbol}
            </Text_1.default>
            <TokenImage_1.default src={src} height={64} width={64} title={token.symbol}/>
          </StyledBox>);
        })}
    </Flex_1.default>);
};
exports.TokenImages = TokenImages;
var TokenPairImages = function () {
    var tokens = Object.values(tokens_1.default).filter(function (token) { return !!(token === null || token === void 0 ? void 0 : token.address); });
    return (<Flex_1.default flexWrap="wrap">
      {tokens.map(function (token) {
            var randomTokenIndex = lodash_1.random(0, tokens.length - 1);
            var primarySrc = "/images/coins/" + token.address[43114] + ".svg";
            var secondarySrc = "/images/coins/" + tokens[randomTokenIndex].address[43114] + ".svg";
            return (<StyledBox key={token.symbol} p="16px">
            <TokenPairImage_1.default primarySrc={primarySrc} secondarySrc={secondarySrc} height={64} width={64} title={token.symbol} mb="16px"/>
            <TokenPairImage_1.default variant="inverted" primarySrc={secondarySrc} secondarySrc={primarySrc} height={64} width={64} title={token.symbol}/>
          </StyledBox>);
        })}
    </Flex_1.default>);
};
exports.TokenPairImages = TokenPairImages;
var templateObject_1;
