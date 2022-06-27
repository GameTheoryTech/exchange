"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Heading_1 = require("../Heading/Heading");
var Input_1 = require("./Input");
var types_1 = require("./types");
var Row = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  margin-bottom: 32px;\n\n  & > input + input {\n    margin-left: 16px;\n  }\n"], ["\n  display: flex;\n  margin-bottom: 32px;\n\n  & > input + input {\n    margin-left: 16px;\n  }\n"])));
exports.default = {
    title: "Components/Input",
    component: Input_1.default,
    argTypes: {},
};
var Default = function () {
    return (<div>
      {Object.keys(types_1.scales).map(function (key) { return (<>
          <Heading_1.default mb="16px">{key}</Heading_1.default>
          <Row>
            <Input_1.default type="text" scale={types_1.scales[key]} value="Value"/>
            <Input_1.default type="text" scale={types_1.scales[key]} placeholder="Placeholder..."/>
            <Input_1.default type="text" scale={types_1.scales[key]} value="Disabled" disabled/>
            <Input_1.default type="text" scale={types_1.scales[key]} value="Success" isSuccess/>
            <Input_1.default type="text" scale={types_1.scales[key]} value="Warning" isWarning/>
          </Row>
        </>); })}
    </div>);
};
exports.Default = Default;
var templateObject_1;
