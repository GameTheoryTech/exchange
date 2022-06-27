"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var react_1 = require("react");
var PancakeToggle_1 = require("./PancakeToggle");
exports.default = {
    title: "Components/PancakeToggle",
    component: PancakeToggle_1.default,
};
var Default = function () {
    var _a = react_1.useState(false), isChecked = _a[0], setIsChecked = _a[1];
    var toggle = function () { return setIsChecked(!isChecked); };
    return (<>
      <div style={{ marginBottom: "32px" }}>
        <PancakeToggle_1.default checked={isChecked} onChange={toggle}/>
      </div>
      <div>
        <PancakeToggle_1.default checked={isChecked} onChange={toggle} scale="sm"/>
      </div>
    </>);
};
exports.Default = Default;
