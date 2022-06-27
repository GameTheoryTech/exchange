var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from "react";
import { random, times } from "lodash";
import styled from "styled-components";
import Flex from "../Box/Flex";
import Box from "../Box/Box";
import Text from "../Text/Text";
import BackgroundImage from "./BackgroundImage";
import Img from "./Image";
import TokenImage from "./TokenImage";
import TokenPairImage from "./TokenPairImage";
import tokenList from "./tokens";
export default {
    title: "Components/Image",
    argTypes: {},
};
export var Image = function () {
    return (React.createElement("div", null,
        React.createElement(Img, { src: "https://via.placeholder.com/800x400", width: 800, height: 400, alt: "test" }),
        React.createElement("div", null, "Image")));
};
export var Background = function () {
    return (React.createElement("div", null,
        React.createElement(BackgroundImage, { src: "https://via.placeholder.com/800x400", width: 800, height: 400, mr: "16px" }),
        React.createElement("div", null, "Background Image")));
};
export var LazyImages = function () {
    return (React.createElement(Flex, { flexWrap: "wrap" }, times(40, function (index) { return (React.createElement(Img, { key: index, src: "https://via.placeholder.com/" + (150 + index), width: 150, height: 150, mb: "16px", mr: "16px" })); })));
};
export var LazyBackgrounds = function () {
    return (React.createElement(Flex, { flexWrap: "wrap" }, times(40, function (index) { return (React.createElement(BackgroundImage, { key: index, src: "https://via.placeholder.com/" + (150 + index), width: 150, height: 150, mb: "16px", mr: "16px" })); })));
};
var StyledBox = styled(Box)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border: 1px solid ", ";\n  flex-basis: 100px;\n  text-align: center;\n"], ["\n  border: 1px solid ", ";\n  flex-basis: 100px;\n  text-align: center;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.cardBorder;
});
export var TokenImages = function () {
    var tokens = Object.values(tokenList).filter(function (token) { return !!(token === null || token === void 0 ? void 0 : token.address); });
    return (React.createElement(Flex, { flexWrap: "wrap" }, tokens.map(function (token) {
        var src = "https://pancakeswap.finance/images/tokens/" + token.address[43114] + ".svg";
        return (React.createElement(StyledBox, { key: token.symbol, p: "16px" },
            React.createElement(Text, { fontSize: "14px", color: "textSubtle" }, token.symbol),
            React.createElement(TokenImage, { src: src, height: 64, width: 64, title: token.symbol })));
    })));
};
export var TokenPairImages = function () {
    var tokens = Object.values(tokenList).filter(function (token) { return !!(token === null || token === void 0 ? void 0 : token.address); });
    return (React.createElement(Flex, { flexWrap: "wrap" }, tokens.map(function (token) {
        var randomTokenIndex = random(0, tokens.length - 1);
        var primarySrc = "/images/coins/" + token.address[43114] + ".svg";
        var secondarySrc = "/images/coins/" + tokens[randomTokenIndex].address[43114] + ".svg";
        return (React.createElement(StyledBox, { key: token.symbol, p: "16px" },
            React.createElement(TokenPairImage, { primarySrc: primarySrc, secondarySrc: secondarySrc, height: 64, width: 64, title: token.symbol, mb: "16px" }),
            React.createElement(TokenPairImage, { variant: "inverted", primarySrc: secondarySrc, secondarySrc: primarySrc, height: 64, width: 64, title: token.symbol })));
    })));
};
var templateObject_1;
