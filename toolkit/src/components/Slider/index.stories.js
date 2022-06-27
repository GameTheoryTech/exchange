var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useState } from "react";
import styled from "styled-components";
import Flex from "../Box/Flex";
import Box from "../Box/Box";
import Text from "../Text/Text";
import Button from "../Button/Button";
import Slider from "./Slider";
export default {
    title: "Components/Slider",
    component: Slider,
    argTypes: {},
};
var Col = styled(Flex)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex-direction: column;\n  width: 420px;\n"], ["\n  flex-direction: column;\n  width: 420px;\n"])));
var SliderVariant = function (_a) {
    var initialValue = _a.initialValue;
    var _b = useState(initialValue), value = _b[0], setValue = _b[1];
    var min = 0;
    var max = 10;
    var percentage = (value / max) * 100;
    return (React.createElement(Slider, { name: "slider", min: min, max: max, value: value, onValueChanged: setValue, valueLabel: value === max ? "MAX" : percentage + "%" }));
};
export var Default = function () {
    return (React.createElement(Col, null,
        React.createElement(SliderVariant, { initialValue: 5 })));
};
export var Variants = function () {
    var _a = useState(10), value = _a[0], setValue = _a[1];
    var handleChange = function (newValue) {
        setValue(newValue);
    };
    return (React.createElement(Col, null,
        React.createElement(Slider, { name: "sliderdisabled", value: value, onValueChanged: handleChange, min: 1, max: 20, disabled: true })));
};
var percentShortcuts = [10, 25, 50, 75];
var initialBalance = 1.795394;
var maxBalance = initialBalance - 0.01;
export var Balance = function () {
    var _a = useState(maxBalance), balance = _a[0], setBalance = _a[1];
    var handleChange = function (newValue) {
        setBalance(newValue);
    };
    var setMax = function () {
        setBalance(maxBalance);
    };
    return (React.createElement(Box, { width: "420px" },
        React.createElement(Slider, { name: "slider", min: 0, max: maxBalance, value: balance, onValueChanged: handleChange }),
        React.createElement(Flex, { justifyContent: "space-between", py: "16px" },
            percentShortcuts.map(function (percent) {
                var handleClick = function () {
                    setBalance((percent / 100) * maxBalance);
                };
                return React.createElement(Button, { scale: "sm", variant: "secondary", onClick: handleClick }, percent + "%");
            }),
            React.createElement(Button, { scale: "sm", variant: "secondary", onClick: setMax }, "Max")),
        React.createElement(Text, null, "Current Balance: " + balance),
        React.createElement(Text, { fontSize: "12px", color: "textSubtle" }, "Initial Balance: " + initialBalance),
        React.createElement(Text, { fontSize: "12px", color: "textSubtle" }, "Max Balance: " + maxBalance)));
};
var templateObject_1;
