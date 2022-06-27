"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var react_1 = require("react");
var Radio_1 = require("./Radio");
exports.default = {
    title: "Components/Radio",
    component: Radio_1.default,
    argTypes: {},
};
var Default = function () {
    var _a = react_1.useState("one"), radio = _a[0], setRadio = _a[1];
    var _b = react_1.useState("one"), radioSm = _b[0], setRadioSm = _b[1];
    var handleChange = function (evt) {
        // eslint-disable-next-line
        console.info("fired");
        var value = evt.target.value;
        setRadio(value);
    };
    var handleChangeSm = function (evt) {
        var value = evt.target.value;
        setRadioSm(value);
    };
    return (<>
      <div style={{ marginBottom: "32px" }}>
        <Radio_1.default name="md" value="one" onChange={handleChange} checked={radio === "one"}/>
        <Radio_1.default name="md" value="two" onChange={handleChange} checked={radio === "two"}/>
      </div>
      <div>
        <Radio_1.default scale="sm" name="sm" value="one" onChange={handleChangeSm} checked={radioSm === "one"}/>
        <Radio_1.default scale="sm" name="sm" value="two" onChange={handleChangeSm} checked={radioSm === "two"}/>
      </div>
    </>);
};
exports.Default = Default;
