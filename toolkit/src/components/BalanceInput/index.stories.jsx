"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var react_1 = require("react");
var Box_1 = require("../Box/Box");
var BalanceInput_1 = require("./BalanceInput");
exports.default = {
    title: "Components/BalanceInput",
    component: BalanceInput_1.default,
    argTypes: {},
};
var Default = function () {
    var _a = (0, react_1.useState)(1.43333), decimalValue = _a[0], setDecimalValue = _a[1];
    var _b = (0, react_1.useState)(5), numericValue = _b[0], setNumericValue = _b[1];
    var currencyValue = function (input) {
        return "~".concat((input * 1.3).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }), " USD");
    };
    var handleDecimalChange = function (input) {
        setDecimalValue(input);
    };
    var handleNumericChange = function (input) {
        setNumericValue(input);
    };
    return (<Box_1.default width="300px">
      <BalanceInput_1.default onUserInput={handleDecimalChange} value={decimalValue} currencyValue={currencyValue(decimalValue)} placeholder="0.0" mb="32px"/>
      <BalanceInput_1.default value={decimalValue * 1.5} onUserInput={handleDecimalChange} currencyValue={currencyValue(decimalValue * 1.5)} placeholder="1.5" isWarning mb="32px"/>
      <BalanceInput_1.default value={numericValue} onUserInput={handleNumericChange} inputProps={{ inputMode: "numeric" }} currencyValue={currencyValue(numericValue)} placeholder="0" mb="32px"/>
    </Box_1.default>);
};
exports.Default = Default;
