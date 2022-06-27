var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from "react";
import styled from "styled-components";
import Heading from "../Heading/Heading";
import Input from "./Input";
import { scales } from "./types";
var Row = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  margin-bottom: 32px;\n\n  & > input + input {\n    margin-left: 16px;\n  }\n"], ["\n  display: flex;\n  margin-bottom: 32px;\n\n  & > input + input {\n    margin-left: 16px;\n  }\n"])));
export default {
    title: "Components/Input",
    component: Input,
    argTypes: {},
};
export var Default = function () {
    return (React.createElement("div", null, Object.keys(scales).map(function (key) { return (React.createElement(React.Fragment, null,
        React.createElement(Heading, { mb: "16px" }, key),
        React.createElement(Row, null,
            React.createElement(Input, { type: "text", scale: scales[key], value: "Value" }),
            React.createElement(Input, { type: "text", scale: scales[key], placeholder: "Placeholder..." }),
            React.createElement(Input, { type: "text", scale: scales[key], value: "Disabled", disabled: true }),
            React.createElement(Input, { type: "text", scale: scales[key], value: "Success", isSuccess: true }),
            React.createElement(Input, { type: "text", scale: scales[key], value: "Warning", isWarning: true })))); })));
};
var templateObject_1;
