"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var react_1 = require("react");
var Toggle_1 = require("./Toggle");
exports.default = {
    title: "Components/Toggle",
    component: Toggle_1.default,
};
var Default = function () {
    var _a = react_1.useState(false), isChecked = _a[0], setIsChecked = _a[1];
    var toggle = function () { return setIsChecked(!isChecked); };
    return (<>
      <div style={{ marginBottom: "32px" }}>
        <Toggle_1.default checked={isChecked} onChange={toggle}/>
      </div>
      <div>
        <Toggle_1.default checked={isChecked} onChange={toggle} scale="sm"/>
      </div>
    </>);
};
exports.Default = Default;
