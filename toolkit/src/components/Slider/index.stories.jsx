"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Balance = exports.Variants = exports.Default = void 0;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Flex_1 = require("../Box/Flex");
var Box_1 = require("../Box/Box");
var Text_1 = require("../Text/Text");
var Button_1 = require("../Button/Button");
var Slider_1 = require("./Slider");
exports.default = {
    title: "Components/Slider",
    component: Slider_1.default,
    argTypes: {},
};
var Col = styled_components_1.default(Flex_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex-direction: column;\n  width: 420px;\n"], ["\n  flex-direction: column;\n  width: 420px;\n"])));
var SliderVariant = function (_a) {
    var initialValue = _a.initialValue;
    var _b = react_1.useState(initialValue), value = _b[0], setValue = _b[1];
    var min = 0;
    var max = 10;
    var percentage = (value / max) * 100;
    return (<Slider_1.default name="slider" min={min} max={max} value={value} onValueChanged={setValue} valueLabel={value === max ? "MAX" : percentage + "%"}/>);
};
var Default = function () {
    return (<Col>
      <SliderVariant initialValue={5}/>
    </Col>);
};
exports.Default = Default;
var Variants = function () {
    var _a = react_1.useState(10), value = _a[0], setValue = _a[1];
    var handleChange = function (newValue) {
        setValue(newValue);
    };
    return (<Col>
      <Slider_1.default name="sliderdisabled" value={value} onValueChanged={handleChange} min={1} max={20} disabled/>
    </Col>);
};
exports.Variants = Variants;
var percentShortcuts = [10, 25, 50, 75];
var initialBalance = 1.795394;
var maxBalance = initialBalance - 0.01;
var Balance = function () {
    var _a = react_1.useState(maxBalance), balance = _a[0], setBalance = _a[1];
    var handleChange = function (newValue) {
        setBalance(newValue);
    };
    var setMax = function () {
        setBalance(maxBalance);
    };
    return (<Box_1.default width="420px">
      <Slider_1.default name="slider" min={0} max={maxBalance} value={balance} onValueChanged={handleChange}/>
      <Flex_1.default justifyContent="space-between" py="16px">
        {percentShortcuts.map(function (percent) {
            var handleClick = function () {
                setBalance((percent / 100) * maxBalance);
            };
            return <Button_1.default scale="sm" variant="secondary" onClick={handleClick}>{percent + "%"}</Button_1.default>;
        })}
        <Button_1.default scale="sm" variant="secondary" onClick={setMax}>
          Max
        </Button_1.default>
      </Flex_1.default>
      <Text_1.default>{"Current Balance: " + balance}</Text_1.default>
      <Text_1.default fontSize="12px" color="textSubtle">{"Initial Balance: " + initialBalance}</Text_1.default>
      <Text_1.default fontSize="12px" color="textSubtle">{"Max Balance: " + maxBalance}</Text_1.default>
    </Box_1.default>);
};
exports.Balance = Balance;
var templateObject_1;
