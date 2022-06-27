"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var react_1 = require("react");
var Checkbox_1 = require("./Checkbox");
exports.default = {
    title: "Components/Checkbox",
    component: Checkbox_1.default,
    argTypes: {},
};
var Default = function () {
    return (<>
      <div style={{ marginBottom: "32px" }}>
        <Checkbox_1.default />
      </div>
      <div>
        <Checkbox_1.default scale="sm"/>
      </div>
    </>);
};
exports.Default = Default;
